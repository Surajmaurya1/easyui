import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface DotShaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /** Base idle color of dots (hex or rgba). Default: "rgba(255, 255, 255, 0.15)" */
  dotColor?: string;
  /** Highlight color of dots illuminated by cursor proximity. Default: "#00F0FF" */
  accentColor?: string;
  /** Base radius of each individual dot in pixels. Default: 1.5 */
  dotSize?: number;
  /** Spacing between adjacent dots in pixels. Default: 22 */
  spacing?: number;
  /** Influence radius around cursor in pixels. Default: 180 */
  cursorRadius?: number;
  /** Force of cursor repulsion/displacement (0 to 1). Default: 0.35 */
  distortionStrength?: number;
  /** Scale factor of dots at peak cursor proximity. Default: 2.2 */
  maxScale?: number;
  /** Ambient wave undulation amplitude (0 to 1). Default: 0.25 */
  waveIntensity?: number;
  /** Animation velocity multiplier. Default: 1 */
  speed?: number;
  /** Whether cursor movement influences the shader. Default: true */
  interactive?: boolean;
  /** Subtle dark/light gradient vignette to blend container boundaries. Default: true */
  overlay?: boolean;
}

interface ParsedColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColorToRgba(colorStr: string): ParsedColor {
  if (typeof document === 'undefined') {
    return { r: 255, g: 255, b: 255, a: 0.2 };
  }
  // Use temporary canvas context to parse any CSS color format (hex, rgb, rgba, hsl)
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { r: 255, g: 255, b: 255, a: 0.2 };

  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = colorStr;
  ctx.fillRect(0, 0, 1, 1);

  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return {
    r: r / 255,
    g: g / 255,
    b: b / 255,
    a: a / 255,
  };
}

// GLSL Vertex Shader for Point Grid
const VERTEX_SHADER_SRC = `
precision highp float;

attribute vec2 a_position;
attribute vec2 a_grid_pos;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_cursor_radius;
uniform float u_distortion;
uniform float u_max_scale;
uniform float u_wave_intensity;
uniform float u_base_dot_size;
uniform float u_interactive;
uniform float u_dpr;

varying float v_proximity;
varying vec2 v_center_dist;

void main() {
    vec2 pos = a_position;
    
    // Ambient undulating wave
    float wave = sin(a_grid_pos.x * 0.15 + a_grid_pos.y * 0.15 + u_time * 1.5) * 4.0 * u_wave_intensity;
    pos.y += wave;

    // Cursor proximity & magnetic repulsion
    float dist = distance(pos, u_mouse);
    float normDist = clamp(dist / max(u_cursor_radius, 1.0), 0.0, 1.0);
    float prox = (1.0 - smoothstep(0.0, 1.0, normDist)) * u_interactive;

    // Repulsion along radial vector
    vec2 dir = pos - u_mouse;
    float dirLen = length(dir);
    if (dirLen > 0.001) {
        dir = dir / dirLen;
    } else {
        dir = vec2(0.0, 0.0);
    }
    pos += dir * (prox * 24.0 * u_distortion);

    v_proximity = prox;

    // Point size expansion at cursor center
    float scale = 1.0 + prox * (u_max_scale - 1.0);
    gl_PointSize = u_base_dot_size * 2.0 * scale * u_dpr;

    // Convert pixels to clip space [-1, 1]
    vec2 zeroToOne = pos / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);
}
`;

// GLSL Fragment Shader: Crisp antialiased circle with smooth color interpolation
const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform vec4 u_dot_color;
uniform vec4 u_accent_color;

varying float v_proximity;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) {
        discard;
    }

    // Soft antialiased border
    float alpha = smoothstep(0.5, 0.38, dist);

    // Color transition from base dot color to illuminated accent
    vec4 finalColor = mix(u_dot_color, u_accent_color, v_proximity);
    gl_FragColor = vec4(finalColor.rgb, finalColor.a * alpha);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const DotShader: React.FC<DotShaderProps> = ({
  children,
  className,
  dotColor = 'rgba(255, 255, 255, 0.15)',
  accentColor = '#00F0FF',
  dotSize = 1.5,
  spacing = 22,
  cursorRadius = 180,
  distortionStrength = 0.35,
  maxScale = 2.2,
  waveIntensity = 0.25,
  speed = 1,
  interactive = true,
  overlay = true,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Inertial mouse position with exponential LERP
  const mouseTargetRef = useRef({ x: -9999, y: -9999 });
  const mouseCurrentRef = useRef({ x: -9999, y: -9999 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseTargetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    isHoveredRef.current = true;
  };

  const handlePointerLeave = () => {
    if (!interactive) return;
    isHoveredRef.current = false;
    mouseTargetRef.current = { x: -9999, y: -9999 };
  };

  // WebGL rendering engine with Canvas 2D fallback
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animFrameId: number;
    let gl: WebGLRenderingContext | null = null;

    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      gl = null;
    }

    const safeSpacing = Math.max(10, spacing);
    const safeDotSize = Math.max(0.5, dotSize);
    const safeCursorRadius = Math.max(40, cursorRadius);

    const baseColorParsed = parseColorToRgba(dotColor);
    const accentColorParsed = parseColorToRgba(accentColor);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let vertexCount = 0;
    let positionBuffer: WebGLBuffer | null = null;
    let gridPosBuffer: WebGLBuffer | null = null;
    let program: WebGLProgram | null = null;

    // Uniform locations
    let uResolutionLoc: WebGLUniformLocation | null = null;
    let uMouseLoc: WebGLUniformLocation | null = null;
    let uTimeLoc: WebGLUniformLocation | null = null;
    let uCursorRadiusLoc: WebGLUniformLocation | null = null;
    let uDistortionLoc: WebGLUniformLocation | null = null;
    let uMaxScaleLoc: WebGLUniformLocation | null = null;
    let uWaveIntensityLoc: WebGLUniformLocation | null = null;
    let uBaseDotSizeLoc: WebGLUniformLocation | null = null;
    let uInteractiveLoc: WebGLUniformLocation | null = null;
    let uDprLoc: WebGLUniformLocation | null = null;
    let uDotColorLoc: WebGLUniformLocation | null = null;
    let uAccentColorLoc: WebGLUniformLocation | null = null;

    let aPositionLoc = -1;
    let aGridPosLoc = -1;

    // WebGL Initialization
    if (gl) {
      const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

      if (vertShader && fragShader) {
        program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vertShader);
          gl.attachShader(program, fragShader);
          gl.linkProgram(program);

          if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);

            aPositionLoc = gl.getAttribLocation(program, 'a_position');
            aGridPosLoc = gl.getAttribLocation(program, 'a_grid_pos');

            uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
            uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
            uTimeLoc = gl.getUniformLocation(program, 'u_time');
            uCursorRadiusLoc = gl.getUniformLocation(program, 'u_cursor_radius');
            uDistortionLoc = gl.getUniformLocation(program, 'u_distortion');
            uMaxScaleLoc = gl.getUniformLocation(program, 'u_max_scale');
            uWaveIntensityLoc = gl.getUniformLocation(program, 'u_wave_intensity');
            uBaseDotSizeLoc = gl.getUniformLocation(program, 'u_base_dot_size');
            uInteractiveLoc = gl.getUniformLocation(program, 'u_interactive');
            uDprLoc = gl.getUniformLocation(program, 'u_dpr');
            uDotColorLoc = gl.getUniformLocation(program, 'u_dot_color');
            uAccentColorLoc = gl.getUniformLocation(program, 'u_accent_color');

            positionBuffer = gl.createBuffer();
            gridPosBuffer = gl.createBuffer();
          } else {
            gl = null; // fallback to 2D
          }
        }
      } else {
        gl = null;
      }
    }

    // Grid Buffer Setup
    const setupGridBuffers = (w: number, h: number) => {
      width = w;
      height = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const cols = Math.ceil(w / safeSpacing) + 2;
      const rows = Math.ceil(h / safeSpacing) + 2;
      vertexCount = cols * rows;

      const positions = new Float32Array(vertexCount * 2);
      const gridPositions = new Float32Array(vertexCount * 2);

      const offsetX = (w % safeSpacing) / 2 - safeSpacing / 2;
      const offsetY = (h % safeSpacing) / 2 - safeSpacing / 2;

      let idx = 0;
      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * safeSpacing;
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * safeSpacing;
          positions[idx * 2] = x;
          positions[idx * 2 + 1] = y;

          gridPositions[idx * 2] = c;
          gridPositions[idx * 2 + 1] = r;
          idx++;
        }
      }

      if (gl && positionBuffer && gridPosBuffer) {
        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, gridPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, gridPositions, gl.STATIC_DRAW);
      }
    };

    // Initial sizing
    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setupGridBuffers(rect.width, rect.height);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nh > 0) {
          setupGridBuffers(nw, nh);
        }
      }
    });
    resizeObserver.observe(container);

    let startTime = performance.now();
    let lastTime = startTime;

    // Render Loop
    const render = (now: number) => {
      const dt = Math.min(0.064, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = (now - startTime) * 0.001 * speed;

      // Mouse position smoothing with exponential damp
      const lerpFactor = 1 - Math.exp(-14 * dt);
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * lerpFactor;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * lerpFactor;

      if (gl && program && positionBuffer && gridPosBuffer) {
        // --- WebGL Shader Draw Path ---
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(program);

        gl.uniform2f(uResolutionLoc, width, height);
        gl.uniform2f(uMouseLoc, mouseCurrentRef.current.x, mouseCurrentRef.current.y);
        gl.uniform1f(uTimeLoc, reducedMotion ? 0 : elapsed);
        gl.uniform1f(uCursorRadiusLoc, safeCursorRadius);
        gl.uniform1f(uDistortionLoc, distortionStrength);
        gl.uniform1f(uMaxScaleLoc, maxScale);
        gl.uniform1f(uWaveIntensityLoc, reducedMotion ? 0 : waveIntensity);
        gl.uniform1f(uBaseDotSizeLoc, safeDotSize);
        gl.uniform1f(uInteractiveLoc, interactive && !reducedMotion ? 1 : 0);
        gl.uniform1f(uDprLoc, dpr);

        gl.uniform4f(
          uDotColorLoc,
          baseColorParsed.r,
          baseColorParsed.g,
          baseColorParsed.b,
          baseColorParsed.a
        );
        gl.uniform4f(
          uAccentColorLoc,
          accentColorParsed.r,
          accentColorParsed.g,
          accentColorParsed.b,
          accentColorParsed.a
        );

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(aPositionLoc);
        gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, gridPosBuffer);
        gl.enableVertexAttribArray(aGridPosLoc);
        gl.vertexAttribPointer(aGridPosLoc, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, vertexCount);
      } else {
        // --- Canvas 2D Fallback Path ---
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, width, height);

          const cols = Math.ceil(width / safeSpacing) + 2;
          const rows = Math.ceil(height / safeSpacing) + 2;
          const offsetX = (width % safeSpacing) / 2 - safeSpacing / 2;
          const offsetY = (height % safeSpacing) / 2 - safeSpacing / 2;

          const mx = mouseCurrentRef.current.x;
          const my = mouseCurrentRef.current.y;

          for (let r = 0; r < rows; r++) {
            const baseY = offsetY + r * safeSpacing;
            for (let c = 0; c < cols; c++) {
              const baseX = offsetX + c * safeSpacing;

              let x = baseX;
              let y = baseY;

              if (!reducedMotion) {
                const wave = Math.sin(c * 0.15 + r * 0.15 + elapsed * 1.5) * 4.0 * waveIntensity;
                y += wave;
              }

              const dist = Math.hypot(x - mx, y - my);
              let prox = 0;
              if (interactive && !reducedMotion && dist < safeCursorRadius) {
                prox = 1 - dist / safeCursorRadius;
                const angle = Math.atan2(y - my, x - mx);
                x += Math.cos(angle) * (prox * 24.0 * distortionStrength);
                y += Math.sin(angle) * (prox * 24.0 * distortionStrength);
              }

              const scale = 1.0 + prox * (maxScale - 1.0);
              const radius = safeDotSize * scale;

              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);

              if (prox > 0.01) {
                ctx.fillStyle = accentColor;
                ctx.globalAlpha = baseColorParsed.a + prox * (accentColorParsed.a - baseColorParsed.a);
              } else {
                ctx.fillStyle = dotColor;
                ctx.globalAlpha = baseColorParsed.a;
              }
              ctx.fill();
            }
          }
          ctx.globalAlpha = 1;
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animFrameId);
      if (gl) {
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (gridPosBuffer) gl.deleteBuffer(gridPosBuffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, [
    dotColor,
    accentColor,
    dotSize,
    spacing,
    cursorRadius,
    distortionStrength,
    maxScale,
    waveIntensity,
    speed,
    interactive,
    reducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn('relative w-full overflow-hidden isolate select-none', className)}
      style={style}
      {...props}
    >
      {/* GPU WebGL / 2D Canvas Shader */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
      />

      {/* Atmospheric Soft Vignette */}
      {overlay && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] select-none bg-radial from-transparent via-transparent to-background/50"
        />
      )}

      {/* Interactive Content Layer */}
      {children && (
        <div className="relative z-10 w-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default DotShader;

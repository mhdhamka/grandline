/**
 * Procedural Web Audio Synthesizer for Grand Line Omniverse Terminal
 * Fixed with bulletproof fallback for the Drums of Liberation!
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private liberationAudio: HTMLAudioElement | null = null;

  constructor() {
    // Restore preference if stored
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('grand_line_sound_enabled');
      this.enabled = stored !== null ? stored === 'true' : true;
      
      // Initialize external audio safely with error trapping
      try {
        this.liberationAudio = new Audio('https://www.zedge.net/ringtones/867cff1b-9b5c-4944-be5d-ae135dd68e4d'); 
        this.liberationAudio.volume = 0.7;
        this.liberationAudio.crossOrigin = 'anonymous';
      } catch {
        // Safe fallback
      }
    }
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('grand_line_sound_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  // Tactical click / blip
  public playClick(freq = 880) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio safety
    }
  }

  // Sword slash (Zoro / Ittoryu / Santoryu)
  public playSwordSlash() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
      filter.Q.value = 4.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio safety
    }
  }

  // Gear Shift (Steam release + rubber tension)
  public playGearShift() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2400, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();

      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.2);

      oscGain.gain.setValueAtTime(0.2, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Audio safety
    }
  }

  // Drums of Liberation (Attempts external file, GUARANTEES fallback to procedural synth if blocked)
  public playDrumsOfLiberation() {
    if (!this.enabled) return;

    let playedExternal = false;

    if (this.liberationAudio) {
      try {
        this.liberationAudio.currentTime = 0;
        const playPromise = this.liberationAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser blocks or url fails, trigger fallback immediately
            this.playProceduralDrums();
          });
          playedExternal = true;
        }
      } catch {
        playedExternal = false;
      }
    }

    // If external audio object wasn't initialized or failed instantly, run procedural fallback
    if (!playedExternal) {
      this.playProceduralDrums();
    }
  }

  // Guaranteed Procedural Drums of Liberation (Joy Boy heartbeat rhythm: Doom-Dut-Da-Da)
  private playProceduralDrums() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const beats = [
        { time: 0.0, freq: 85, vol: 0.3 },
        { time: 0.15, freq: 115, vol: 0.25 },
        { time: 0.3, freq: 95, vol: 0.22 },
        { time: 0.42, freq: 130, vol: 0.28 },
      ];

      beats.forEach((b) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(b.freq, ctx.currentTime + b.time);
        osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + b.time + 0.12);

        gain.gain.setValueAtTime(b.vol, ctx.currentTime + b.time);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + b.time + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + b.time);
        osc.stop(ctx.currentTime + b.time + 0.15);
      });
    } catch {
      // Audio safety
    }
  }

  // Bounty Fanfare / Chime
  public playBountyChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.32);
      });
    } catch {
      // Audio safety
    }
  }

  // Ancient Road Poneglyph resonance
  public playPoneglyphHum() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65.41, ctx.currentTime); // C2 deep drone
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(130.81, ctx.currentTime); // C3 harmonic

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 1.3);
      osc2.stop(ctx.currentTime + 1.3);
    } catch {
      // Audio safety
    }
  }

  // Conqueror's Haki Lightning (Thick electrical crackle + heavy sub-bass shockwave)
  public playConquerorsLightning() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.4);

      oscGain.gain.setValueAtTime(0.3, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.42);

      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.7 ? 1 : 0.2);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.value = 5.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio safety
    }
  }

  // Den Den Mushi Ring ("Purupurupuru... Gacha!")
  public playDenDenMushi() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const rings = [0, 0.12, 0.24, 0.45, 0.57, 0.69];
      rings.forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(750, ctx.currentTime + t);
        osc.frequency.linearRampToValueAtTime(820, ctx.currentTime + t + 0.06);

        gain.gain.setValueAtTime(0.05, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.08);
      });
    } catch {
      // Audio safety
    }
  }
}

export const sound = new SoundEngine(); 
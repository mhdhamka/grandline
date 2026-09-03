/**
 * Procedural Web Audio Synthesizer for Grand Line Omniverse Terminal
 * No external sound files required — pure browser Web Audio API synthesis
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // Restore preference if stored
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('grand_line_sound_enabled');
      this.enabled = stored !== null ? stored === 'true' : true;
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
      // 1. Steam hiss (filtered noise)
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

      // 2. Heavy rubber recoil thud
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

  // Drums of Liberation (Gear 5 Joy Boy heartbeat rhythm: Doom-Dut-Da-Da)
  public playDrumsOfLiberation() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const beats = [
        { time: 0.0, freq: 85, vol: 0.25 },
        { time: 0.12, freq: 110, vol: 0.2 },
        { time: 0.24, freq: 95, vol: 0.18 },
        { time: 0.32, freq: 125, vol: 0.22 },
      ];

      beats.forEach((b) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(b.freq, ctx.currentTime + b.time);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + b.time + 0.1);

        gain.gain.setValueAtTime(b.vol, ctx.currentTime + b.time);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + b.time + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + b.time);
        osc.stop(ctx.currentTime + b.time + 0.12);
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
      // 1. Deep seismic thunder shockwave
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

      // 2. Crackling lightning burst
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

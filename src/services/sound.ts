/**
 * 8-Bit Web Audio API Chiptune Synthesizer
 * Generates authentic retro square/triangle wave sounds and background music loops without external mp3s.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmIntervalId: number | null = null;
  private isBgmPlaying = false;
  
  public bgmEnabled = true;
  public sfxEnabled = true;
  public volume = 0.6; // 0 to 1
  public currentTrack: 'retro_arcade' | 'relax_chiptune' | 'boss_battle' = 'retro_arcade';

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.bgmEnabled ? this.volume * 0.35 : 0, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? this.volume * 0.6 : 0, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.bgmGain && this.sfxGain) {
      this.bgmGain.gain.setValueAtTime(this.bgmEnabled ? this.volume * 0.35 : 0, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? this.volume * 0.6 : 0, this.ctx.currentTime);
    }
  }

  public toggleBgm(enabled?: boolean) {
    this.bgmEnabled = enabled !== undefined ? enabled : !this.bgmEnabled;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmEnabled ? this.volume * 0.35 : 0, this.ctx.currentTime);
    }
    if (!this.bgmEnabled) {
      this.stopBGM();
    } else if (!this.isBgmPlaying) {
      this.startBGM(this.currentTrack);
    }
    return this.bgmEnabled;
  }

  public toggleSfx(enabled?: boolean) {
    this.sfxEnabled = enabled !== undefined ? enabled : !this.sfxEnabled;
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? this.volume * 0.6 : 0, this.ctx.currentTime);
    }
    return this.sfxEnabled;
  }

  // --- Retro Sound Effects ---

  public playClick() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playSelect() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.04); // E5

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  public playRouletteTick() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(300 + Math.random() * 200, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  public playCorrect() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.35, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0, now + idx * 0.08 + 0.15);

      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.16);
    });
  }

  public playIncorrect() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  public playLaser() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playVictory() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    // Classic 8-bit fanfare notes: C5, C5, C5, F5, A5, C6
    const melody = [
      { f: 523.25, d: 0.1, t: 0 },
      { f: 523.25, d: 0.1, t: 0.12 },
      { f: 523.25, d: 0.1, t: 0.24 },
      { f: 698.46, d: 0.25, t: 0.36 },
      { f: 880.00, d: 0.25, t: 0.62 },
      { f: 1046.50, d: 0.5, t: 0.88 },
    ];

    melody.forEach(({ f, d, t }) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.4, now + t);
      gain.gain.linearRampToValueAtTime(0, now + t + d);

      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + t);
      osc.stop(now + t + d);
    });
  }

  public playCountdownTick(isFinal: boolean = false) {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(isFinal ? 880 : 440, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + (isFinal ? 0.2 : 0.08));

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + (isFinal ? 0.21 : 0.09));
  }

  // --- Chiptune Background Music Generator ---

  public startBGM(track: 'retro_arcade' | 'relax_chiptune' | 'boss_battle' = 'retro_arcade') {
    this.currentTrack = track;
    if (!this.bgmEnabled) return;
    this.stopBGM();
    this.initContext();
    if (!this.ctx || !this.bgmGain) return;

    this.isBgmPlaying = true;

    // Chiptune scales & arpeggio loops
    const arcadeMelody = [
      261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 329.63,
      293.66, 369.99, 440.00, 587.33, 440.00, 369.99, 293.66, 369.99,
      329.63, 392.00, 493.88, 659.25, 493.88, 392.00, 329.63, 392.00,
      261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.5, 783.99,
    ];

    const relaxMelody = [
      329.63, 0, 392.00, 0, 440.00, 0, 523.25, 392.00,
      349.23, 0, 440.00, 0, 523.25, 0, 587.33, 440.00,
      293.66, 0, 369.99, 0, 440.00, 0, 493.88, 369.99,
      261.63, 0, 329.63, 0, 392.00, 0, 523.25, 0,
    ];

    const bossMelody = [
      130.81, 130.81, 261.63, 196.00, 130.81, 130.81, 246.94, 185.00,
      130.81, 130.81, 261.63, 196.00, 311.13, 293.66, 261.63, 196.00,
      146.83, 146.83, 293.66, 220.00, 146.83, 146.83, 277.18, 207.65,
      146.83, 146.83, 293.66, 220.00, 349.23, 329.63, 293.66, 220.00,
    ];

    const notes = track === 'relax_chiptune' ? relaxMelody : track === 'boss_battle' ? bossMelody : arcadeMelody;
    const tempo = track === 'boss_battle' ? 120 : track === 'relax_chiptune' ? 180 : 140; // ms per step
    let step = 0;

    const playStep = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;

      const freq = notes[step % notes.length];
      if (freq > 0) {
        // Lead Voice (Square Wave)
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        osc.type = track === 'relax_chiptune' ? 'triangle' : 'square';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const duration = (tempo / 1000) * 0.85;
        noteGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(noteGain);
        noteGain.connect(this.bgmGain);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);

        // Sub Bass Voice on every 4th beat
        if (step % 4 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(freq / 2, this.ctx.currentTime);
          bassGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
          bassGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + (tempo / 1000) * 1.5);
          bassOsc.connect(bassGain);
          bassGain.connect(this.bgmGain);
          bassOsc.start();
          bassOsc.stop(this.ctx.currentTime + (tempo / 1000) * 1.5);
        }
      }

      step++;
    };

    this.bgmIntervalId = window.setInterval(playStep, tempo);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId !== null) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }
}

export const sound = new SoundService();

import { COLORS } from '../config/constants.js';

/**
 * Particle class - represents a single particle effect
 */
export class Particle {
    constructor(x, y, color = COLORS.PARTICLE_PRIMARY, velocity = { x: 0, y: 0 }, lifetime = 1000) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.lifetime = lifetime;
        this.age = 0;
        this.size = 3;
        this.active = true;
    }

    update(deltaTime) {
        if (!this.active) return;

        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
        this.age += deltaTime * 1000; // Convert to ms

        if (this.age >= this.lifetime) {
            this.active = false;
        }
    }

    getOpacity() {
        return Math.max(0, 1 - (this.age / this.lifetime));
    }

    render(ctx) {
        if (!this.active) return;

        ctx.save();
        ctx.globalAlpha = this.getOpacity();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    reset(x, y, color, velocity, lifetime) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.lifetime = lifetime;
        this.age = 0;
        this.active = true;
    }
}

/**
 * ParticleSystem - manages multiple particles with object pooling
 */
export class ParticleSystem {
    constructor(poolSize = 100) {
        this.particles = [];
        this.pool = [];

        // Pre-create particles for pooling
        for (let i = 0; i < poolSize; i++) {
            this.pool.push(new Particle(0, 0));
        }
    }

    emit(x, y, count = 10, color = COLORS.PARTICLE_PRIMARY) {
        for (let i = 0; i < count; i++) {
            const particle = this.getParticle();
            if (!particle) continue;

            const angle = (Math.PI * 2 * i) / count;
            const speed = 50 + Math.random() * 100;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            const lifetime = 500 + Math.random() * 500;

            particle.reset(x, y, color, velocity, lifetime);
            this.particles.push(particle);
        }
    }

    getParticle() {
        return this.pool.length > 0 ? this.pool.pop() : new Particle(0, 0);
    }

    update(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(deltaTime);

            if (!particle.active) {
                this.particles.splice(i, 1);
                this.pool.push(particle);
            }
        }
    }

    render(ctx) {
        this.particles.forEach(particle => particle.render(ctx));
    }

    clear() {
        this.particles.forEach(p => this.pool.push(p));
        this.particles = [];
    }
}

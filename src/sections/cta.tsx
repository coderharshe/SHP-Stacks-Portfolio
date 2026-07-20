"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CameraReactive } from '@/components/ui/CameraReactive';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export const CTA: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ContactFormData>({
    mode: 'onTouched'
  });

  const onSubmit = (data: ContactFormData) => {
    // Simulated submission
    console.log('Submission received:', data);
    setIsSubmitted(true);
  };

  return (
    <section id="cta" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent">
      {/* Section background overlay */}
      <div className="absolute inset-0 -z-10" />

      {/* Background blobs */}
      <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-accent-blue/10 blur-[130px] -z-10" />
      <div className="absolute top-[20%] right-[-10%] h-[350px] w-[350px] rounded-full bg-accent-purple/10 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Copy & Slogan */}
          <CameraReactive depth="hero-title" sectionProgressTarget={0.90} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-mono uppercase tracking-widest font-bold" style={{ color: '#E8372A' }}>
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-sans leading-tight" style={{ color: '#F0F1F3' }}>
                Ready to Build Your Next Product?
              </h2>
              <p className="text-base sm:text-lg leading-relaxed font-semibold" style={{ color: '#A8ACBA' }}>
                Let&rsquo;s engineer software that drives actual growth for your company. Whether you need a warehouse management system, custom ERP, or an AI agent platform, our team is equipped to deliver.
              </p>
            </div>

              <div className="space-y-5 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl transition-all duration-200 hover:bg-[rgba(255,255,255,0.03)] -mx-3"
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center group-hover:border-[#E8372A]/50 transition-colors shrink-0"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(232,55,42,0.10)' }}
                  >
                    <Calendar className="h-5 w-5 text-[#E8372A]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold transition-colors group-hover:text-[#E8372A]" style={{ color: '#F0F1F3' }}>
                      Book a Discovery Call
                    </h4>
                    <p className="text-sm sm:text-base font-semibold" style={{ color: '#A8ACBA' }}>Choose a time slot to review your specs.</p>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl transition-all duration-200 hover:bg-[rgba(255,255,255,0.03)] -mx-3"
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center group-hover:border-[#E8372A]/50 transition-colors shrink-0"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(232,55,42,0.10)' }}
                  >
                    <Mail className="h-5 w-5 text-[#E8372A]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold transition-colors group-hover:text-[#E8372A]" style={{ color: '#F0F1F3' }}>
                      Direct Email Inquiry
                    </h4>
                    <p className="text-sm sm:text-base font-bold font-mono tracking-wide" style={{ color: '#F0F1F3' }}>{CONTACT_INFO.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl transition-all duration-200 hover:bg-[rgba(255,255,255,0.03)] -mx-3"
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center group-hover:border-[#E8372A]/50 transition-colors shrink-0"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(232,55,42,0.10)' }}
                  >
                    <Phone className="h-5 w-5 text-[#E8372A]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold transition-colors group-hover:text-[#E8372A]" style={{ color: '#F0F1F3' }}>
                      Call / WhatsApp
                    </h4>
                    <p className="text-sm sm:text-base font-bold font-mono tracking-wide" style={{ color: '#F0F1F3' }}>{CONTACT_INFO.phoneFormatted}</p>
                  </div>
                </a>
              </div>
          </CameraReactive>

          {/* Right Column - Contact Form */}
          <CameraReactive depth="card" tiltOnHover={true} sectionProgressTarget={0.90} className="lg:col-span-7">
            <Card glowColor="blue" className="p-6 sm:p-8 border-[#111827]/5 glass-card shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center gap-5">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(34,197,94,0.20)', background: 'rgba(34,197,94,0.05)' }}>
                    <CheckCircle2 className="h-6 w-6" style={{ color: '#22C55E' }} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: '#F0F1F3' }}>
                      Requirements Received
                    </h3>
                    <p className="text-base font-semibold max-w-sm leading-relaxed" style={{ color: '#A8ACBA' }}>
                      Thank you. We have received your project details and will review them within 12 business hours.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-sm font-bold py-2 px-5"
                  >
                    <span>Submit another inquiry</span>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name & Email Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold" style={{ color: '#F0F1F3' }}>Your Name</label>
                      <input
                        id="name" type="text" placeholder="John Doe"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full rounded-lg px-4 py-2.5 text-sm sm:text-base font-medium focus:outline-none focus:ring-1 transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: '#F0F1F3',
                          '--tw-ring-color': 'rgba(232,55,42,0.30)',
                        } as React.CSSProperties}
                        onFocus={e => (e.target.style.borderColor = 'rgba(232,55,42,0.50)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                      {errors.name && <p className="text-xs font-mono font-bold" style={{ color: '#E8372A' }}>{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold" style={{ color: '#F0F1F3' }}>Email Address</label>
                      <input
                        id="email" type="email" placeholder="john@company.com"
                        {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                        className="w-full rounded-lg px-4 py-2.5 text-sm sm:text-base font-medium focus:outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F1F3' }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(232,55,42,0.50)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                      {errors.email && <p className="text-xs font-mono font-bold" style={{ color: '#E8372A' }}>{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Company & Budget Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold" style={{ color: '#F0F1F3' }}>Company Name</label>
                      <input
                        id="company" type="text" placeholder="Acme Corp"
                        {...register('company', { required: 'Company is required' })}
                        className="w-full rounded-lg px-4 py-2.5 text-sm sm:text-base font-medium focus:outline-none transition-all"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F1F3' }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(232,55,42,0.50)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                      {errors.company && <p className="text-xs font-mono font-bold" style={{ color: '#E8372A' }}>{errors.company.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold" style={{ color: '#F0F1F3' }}>Budget Range</label>
                      <select
                        id="budget"
                        {...register('budget', { required: 'Please select a budget range' })}
                        className="w-full rounded-lg px-4 py-2.5 text-sm sm:text-base font-medium focus:outline-none transition-all appearance-none cursor-pointer"
                        style={{ background: '#111318', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F1F3' }}
                      >
                        <option value="">Select a range...</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="over-50k">$50,000+</option>
                      </select>
                      {errors.budget && <p className="text-xs font-mono font-bold" style={{ color: '#E8372A' }}>{errors.budget.message}</p>}
                    </div>
                  </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold" style={{ color: '#F0F1F3' }}>Project Description</label>
                      <textarea
                        id="message" rows={4}
                        placeholder="Outline your technical requirements, scaling problems, or system scope..."
                        {...register('message', { required: 'Project description is required' })}
                        className="w-full rounded-lg px-4 py-2.5 text-sm sm:text-base font-medium focus:outline-none transition-all resize-none"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', color: '#F0F1F3' }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(232,55,42,0.50)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                      {errors.message && <p className="text-xs font-mono font-bold" style={{ color: '#E8372A' }}>{errors.message.message}</p>}
                    </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      glow
                      className="w-full py-3.5 text-base font-bold tracking-wide"
                    >
                      <span>Submit Project Specs</span>
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </CameraReactive>

        </div>
      </div>
    </section>
  );
};

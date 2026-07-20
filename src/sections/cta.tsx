"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <section id="cta" className="relative py-24 sm:py-32 border-t border-border overflow-hidden bg-transparent" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2500&auto=format&fit=crop')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Parallax Overlay */}
      <div className="absolute inset-0 bg-[#F8FAF9]/90 -z-10" />

      {/* Background blobs */}
      <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-accent-blue/10 blur-[130px] -z-10" />
      <div className="absolute top-[20%] right-[-10%] h-[350px] w-[350px] rounded-full bg-accent-purple/10 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Copy & Slogan */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-blue font-semibold">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111827] font-sans leading-tight">
                Ready to Build Your Next Product?
              </h2>
              <p className="text-sm sm:text-base text-foreground/50 leading-relaxed font-light">
                Let&rsquo;s engineer software that drives actual growth for your company. Whether you need a warehouse management system, custom ERP, or an AI agent platform, our team is equipped to deliver.
              </p>
            </div>

            {/* Support Actions */}
            <div className="space-y-4 pt-4 border-t border-[#111827]/5">
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg border border-border bg-white/2 flex items-center justify-center group-hover:border-[#111827]/12 transition-colors">
                  <Calendar className="h-4.5 w-4.5 text-accent-blue" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#111827] group-hover:text-accent-blue transition-colors">
                    Book a Discovery Call
                  </h4>
                  <p className="text-xs text-foreground/45">Choose a time slot to review your specs.</p>
                </div>
              </a>

              <a 
                href="mailto:contact@shpstacks.com" 
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg border border-border bg-white/2 flex items-center justify-center group-hover:border-[#111827]/12 transition-colors">
                  <Mail className="h-4.5 w-4.5 text-accent-purple" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-semibold text-[#111827] group-hover:text-accent-purple transition-colors">
                    Direct Email Inquiry
                  </h4>
                  <p className="text-xs text-foreground/45">Send requirements directly to founders.</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <Card glowColor="blue" className="p-6 sm:p-8 border-[#111827]/5 bg-card/65 shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center gap-5">
                  <div className="h-12 w-12 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#111827] tracking-tight">
                      Requirements Received
                    </h3>
                    <p className="text-sm text-foreground/50 max-w-sm leading-relaxed font-light">
                      Thank you. We have received your project details and will review them within 12 business hours.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-xs py-1.5 px-4"
                  >
                    <span>Submit another inquiry</span>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name & Email Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-wider text-[#111827]/55">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full bg-black/40 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
                      />
                      {errors.name && (
                        <p className="text-[10px] text-red-400 font-mono">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-wider text-[#111827]/55">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full bg-black/40 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-400 font-mono">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Company & Budget Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-[10px] font-mono uppercase tracking-wider text-[#111827]/55">
                        Company Name
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Corp"
                        {...register('company', { required: 'Company is required' })}
                        className="w-full bg-black/40 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
                      />
                      {errors.company && (
                        <p className="text-[10px] text-red-400 font-mono">{errors.company.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="text-[10px] font-mono uppercase tracking-wider text-[#111827]/55">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        {...register('budget', { required: 'Please select a budget range' })}
                        className="w-full bg-neutral-900 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground/80 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a range...</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="over-50k">$50,000+</option>
                      </select>
                      {errors.budget && (
                        <p className="text-[10px] text-red-400 font-mono">{errors.budget.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Project message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-wider text-[#111827]/55">
                      Project Description
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Outline your technical requirements, scaling problems, or system scope..."
                      {...register('message', { required: 'Project description is required' })}
                      className="w-full bg-black/40 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-foreground/20 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-[10px] text-red-400 font-mono">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      glow
                      className="w-full py-3"
                    >
                      <span>Submit Project Specs</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

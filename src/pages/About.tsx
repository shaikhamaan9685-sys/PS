import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo('.about-hero-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo('.about-hero-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }

    // Story section animation
    gsap.fromTo('.story-content',
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
        }
      }
    );

    // Values animation
    gsap.fromTo('.value-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="about-hero-title text-5xl md:text-6xl font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="about-hero-text text-xl text-purple-200 max-w-2xl mx-auto">
            A passion for perfection, a dedication to artistry, and an unwavering commitment to creating fragrances that tell your unique story.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="story-content">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Crafted with Passion
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2018, PerfumeStudio began as a dream to create exceptional fragrances that capture the essence of individual stories. Our founder, Isabella Martinez, spent over a decade mastering the art of perfumery in the historic fragrance houses of Grasse, France.
                </p>
                <p>
                  Every fragrance in our collection is a carefully orchestrated symphony of the finest ingredients sourced from around the world. From the Bulgarian rose fields to the sandalwood forests of India, we seek out only the most exceptional raw materials.
                </p>
                <p>
                  Today, PerfumeStudio has grown into a global brand, but we've never forgotten our core mission: to create fragrances that are as unique and memorable as the people who wear them.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5797999/pexels-photo-5797999.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Perfume creation process"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every fragrance we create and every relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="value-card bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We never compromise on quality, sourcing only the finest ingredients and employing master craftspeople.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Passion</h3>
              <p className="text-gray-600">
                Every fragrance is created with love and dedication, reflecting our deep passion for the art of perfumery.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">
                We believe in building lasting relationships with our customers and supporting the communities where we source our ingredients.
              </p>
            </div>

            <div className="value-card bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of traditional perfumery while respecting time-honored techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Master Perfumer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The visionary behind our exceptional fragrances.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Isabella Martinez"
                    className="w-48 h-48 object-cover rounded-full mx-auto md:mx-0 mb-6 shadow-xl"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Isabella Martinez</h3>
                  <p className="text-xl text-purple-600 mb-6">Master Perfumer & Founder</p>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      With over 15 years of experience in the fragrance industry, Isabella trained under renowned masters in Grasse, France, before founding PerfumeStudio.
                    </p>
                    <p>
                      Her philosophy is simple: every fragrance should tell a story, evoke emotions, and create lasting memories. This vision guides every creation that bears the PerfumeStudio name.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Discover Your Signature Scent
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Experience the art of fine perfumery with our curated collection of exceptional fragrances.
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Our Collection
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
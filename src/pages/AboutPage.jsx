import React from "react";
import { MessageSquare, Users, Globe, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 shadow-2xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-primary">About Us</h1>
            <p className="mt-2">A global chat experience built for everyone</p>
          </div>

          {/* Our Mission */}
          <div className="space-y-1.5">
            <div className="text-sm text-secondary flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              Our Mission
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              We started with a mission to create a fast, simple, and fun way
              for people across the world to connect through real-time messaging
              — no barriers, no friction.
            </p>
          </div>

          {/* Community Driven */}
          <div className="space-y-1.5">
            <div className="text-sm text-secondary flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              Community First
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              Our platform is designed to make conversations effortless and
              inclusive. We prioritize user safety, ease of use, and a friendly
              experience.
            </p>
          </div>

          {/* Global Focus */}
          <div className="space-y-1.5">
            <div className="text-sm  flex items-center gap-2 text-secondary">
              <Globe className="w-4 h-4 text-accent" />
              Connect Worldwide
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
              No matter where you are, you can chat instantly with people around
              the globe. — just join and start connecting.
            </p>
          </div>

          {/* Vision */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4 text-secondary">
              What’s Next?
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-secondary">
                <Rocket className="w-4 h-4 text-accent" />
                Continuous Innovation
              </div>
              <p>
                We’re working on new features like group chats, media sharing,
                and smart moderation — all to make your experience smoother and
                safer.
              </p>
              <p className="text-zinc-400">
                Stay connected. Stay global. Stay real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

"use client";

import GradientText from "@/components/GradientText";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm py-6 sm:py-8">
      <div className="max-w-6xl mx-auto text-center space-y-3 px-4 sm:px-6">
        <div className="text-slate-400 text-[11px] font-medium tracking-wide uppercase">
          smart-i18n-auto · Auto Internationalization for Spring Boot
        </div>
        <div className="text-xs leading-relaxed">
          <a
            href="https://devtamakuwala.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:scale-105"
          >
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              animationSpeed={1}
              showBorder
              pauseOnHover={true}
              yoyo={true}
            >
              Developed By Dev Tamakuwala
            </GradientText>
          </a>
        </div>
      </div>
    </footer>
  );
}

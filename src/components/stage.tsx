import { home, site } from "@/lib/site";

export function Stage() {
  return (
    <section className="bg-veld">
      <div className="frame border-t border-line py-24 md:py-32">
        <h2 className="display text-[clamp(2.8rem,7vw,6rem)]">{home.video.title}</h2>
        <div className="relative mt-12 overflow-hidden bg-veld-soft">
          <div className="aspect-video">
            <iframe
              title={home.video.title}
              src={site.srfEmbed}
              className="h-full w-full"
              allow="geolocation *; autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        <p className="mt-4 text-sm text-ash/50">{site.videoCaption}</p>
      </div>
    </section>
  );
}

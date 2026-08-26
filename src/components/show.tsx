import { EmberA } from "@/components/ui";
import { show } from "@/lib/site";

export function Show() {
  return (
    <section id="programm" className="relative bg-ash text-veld">
      <div className="frame grid items-end gap-14 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
          <p className="label text-ember">{show.eyebrow}</p>
          <h2 className="display mt-4 text-[clamp(3.2rem,8vw,7rem)] text-veld">
            {show.title}
          </h2>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-veld/75">{show.copy}</p>
        </div>

        <aside className="border border-veld/12 bg-ash-deep/70 p-7 md:col-span-5 md:p-9">
          <p className="label text-ember">Nächster Abend</p>
          <p className="display mt-5 text-[clamp(4.5rem,10vw,6.4rem)] leading-none">
            {show.day}
            <span className="text-[0.42em]">.{show.month.slice(0, 3)}</span>
          </p>
          <p className="mt-2 text-lg text-veld/70">
            {show.weekday} {show.year}
          </p>
          <dl className="mt-8 space-y-3 text-sm uppercase tracking-[0.14em]">
            <div className="flex justify-between gap-6 border-t border-veld/10 pt-3">
              <dt className="text-veld/45">Beginn</dt>
              <dd>{show.time}</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-veld/10 pt-3">
              <dt className="text-veld/45">Tür</dt>
              <dd>{show.doors}</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-veld/10 pt-3">
              <dt className="text-veld/45">Ort</dt>
              <dd className="text-right">
                {show.venue}
                <br />
                {show.address}, {show.city}
              </dd>
            </div>
          </dl>
          <EmberA href={show.tickets} className="mt-8 h-14 w-full justify-center">
            Tickets
          </EmberA>
        </aside>
      </div>
    </section>
  );
}

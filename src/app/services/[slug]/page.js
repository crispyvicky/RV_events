import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/site/Reveal";
import { getServiceBySlug, getServices } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return pageMeta({
    title: service.title,
    description: service.excerpt,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "RV EVENTS" },
    areaServed: ["Hyderabad", "Kakinada"],
  };

  return (
    <div className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1400px] items-end px-6 pb-16 md:px-10 lg:px-16">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
              {service.category}
            </p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">{service.title}</h1>
            <p className="mt-3 font-display text-2xl text-[var(--color-fog-muted)]">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <Reveal>
          <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <p className="font-body text-base leading-relaxed text-[var(--color-fog-muted)] md:text-lg">
                {service.description}
              </p>
            </div>
            <div className="border border-[var(--color-line)] p-8">
              <p className="font-body text-xs uppercase tracking-[0.22em] text-[var(--color-stone)]">
                Plan with us
              </p>
              <p className="mt-4 font-display text-2xl">
                Request a tailored quotation for {service.title.toLowerCase()} in
                Hyderabad or Kakinada.
              </p>
              <Link href="/get-quote" className="btn-primary mt-8 inline-flex">
                Get quote
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

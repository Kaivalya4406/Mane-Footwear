import { getCollections } from "../../lib/data/collections";
import CollectionCard from "./CollectionCard";

export default function CollectionsGrid() {
  const collections = getCollections();
  const [featuredCollection, ...restCollections] = collections;

  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Shop by Collection</h2>
          <p className="mt-3 text-sm text-foreground/70 sm:text-base">
            Explore footwear curated for every member of the family.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          <CollectionCard collection={featuredCollection} featured />
          {restCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
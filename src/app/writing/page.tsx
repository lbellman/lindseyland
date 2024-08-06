import Layout from "@/layouts/Layout";

export default function Writing() {
  return (
    <Layout>
      <div className="flex flex-col flex-nowrap">
        <div className="p-xl w-full max-w-screen-lg bg-card rounded-3xl">
          <h4>Smop </h4>
          <p className="mt-md body2">
            In a far away corner of the universe, on a tiny, desolate planet
            lives a solitary creature made out of clay. His name is Smop.
          </p>
        </div>
        <div className="p-xl mt-lg w-full max-w-screen-lg bg-card rounded-3xl">
          <h4>Collected Writing </h4>
          <p className="mt-md body2">
            A collection of poetry and prose to soothe the soul.
          </p>
        </div>
      </div>
    </Layout>
  );
}

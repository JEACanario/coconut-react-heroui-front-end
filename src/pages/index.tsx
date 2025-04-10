import "@/styles/index.css";
import Landing from "@/components/landing.tsx";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Landing />
    </DefaultLayout>
  );
}

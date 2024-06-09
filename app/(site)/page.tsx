import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export const revalidate = 0;

export default function Home() {
  return (
    <div className="h-full w-full bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
          <div>
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div>Newest Songs</div>
        <div>No songs available</div>
      </div>
    </div>
  );
}

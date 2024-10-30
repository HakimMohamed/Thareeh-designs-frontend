// import { Button } from "@nextui-org/button";
// This is a Server Component by default
// async function getData() {
//   try {
//     const res = await fetch("https://api.example.com/data", {
//       cache: "no-store",
//     });
//     return res.json();
//   } catch (err) {
//     console.error(err);
//   }
// }

export default async function Page() {
  // const data = await getData();

  return (
    <main className="p-4">
      {/* <Button>Server Rendered Button</Button> */}
      {/* Display your data here */}
    </main>
  );
}

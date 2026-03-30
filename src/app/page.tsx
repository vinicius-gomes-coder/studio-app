import Header from "@/components/header"

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Usuario!</h2>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

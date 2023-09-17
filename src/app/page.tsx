export default function Home() {
  return (
    <main className="w-full">
      <div id="main-visual" className="md:flex justify-between m-1 p-1 bg-red-100">
        <div className="md:w-1/2 md:h-64 flex justify-center m-1 p-1 bg-red-200">
          <div className="flex items-center">
            Main Visual left
          </div>
        </div>
        <div className="md:w-1/2 md:h-64 flex justify-center m-1 p-1 bg-red-200">
          <div className="flex items-center">
            Main Visual right
          </div>
        </div>
      </div>
      <div id="content1" className="flex justify-center m-1 p-1 bg-yellow-100">
        <div className="w-full h-96 flex justify-center items-center bg-yellow-200">
          Content1
        </div>
      </div>
      <div id="content2" className="flex justify-center m-1 p-1 bg-orange-100">
        <div className="w-full h-96 flex justify-center items-center bg-orange-200">
          Content2
        </div>
      </div>
    </main>
  )
}
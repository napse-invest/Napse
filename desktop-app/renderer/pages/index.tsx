import ContextHeader from '@/components/layout/contextHeader'

export default function Index(): JSX.Element {
  return (
    <>
      <ContextHeader isServer>
        <div className="container mt-24 align-middle">
          <h1 className="text-5xl font-bold leading-tight tracking-tighter">
            Welcome to Napse
          </h1>
          <div className=" space-y-10">
            <p className="text-3xl font-normal leading-tight tracking-tighter">
              Napse is a 100% free and open source investment platform.
            </p>
            <div>
              <p className="text-xl">
                In order to manage your investments, you{"'"}ll need to connect
                to a server.
              </p>
              <p className="text-xl">
                To do so, click on Server in the top right corner. And then
                select the server you want to connect to, or add a new one.
              </p>
            </div>
          </div>
        </div>
      </ContextHeader>
    </>
  )
}

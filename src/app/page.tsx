"use client"
import { useEffect, useState } from 'react'

const baseURL = 'https://uselessfacts.jsph.pl'

export default function Home() {

  const [factObj, setFactObj] = useState({
    text: "",
    source_url: ""
  })
  const [loading, setLoading] = useState(true)

  const getFact = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseURL}/api/v2/facts/random`, { headers: {
        Accept: "application/json"
      }})
      const data = await res.json()
      setFactObj(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFact()
  }, [])

  return (
    <main className="p-24">
      <section>
        {loading ? <>fetching the fact. hold on ...</> : 
          <>
            <h1>
              <p className="text-4xl font-bold">
                {factObj.text}
              </p>
              <a href={factObj?.source_url}>click to find out more</a>
            </h1>
          </>
        }
      </section>
      <section className='m-24 flex flex-row justify-center items-center'>
        <button className='border px-4 py-2 rounded-full' onClick={getFact}>get a new one</button>
      </section>
    </main>
  )
}

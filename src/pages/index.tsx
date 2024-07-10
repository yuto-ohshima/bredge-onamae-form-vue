import Image from 'next/image'
import { Inter } from 'next/font/google'
import { OnamaeForm } from 'onamae-form'
import { useCallback, useEffect, useRef, useState } from 'react'
import { App, createApp, h } from 'vue'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [onamae, setOnamae] = useState<{ firstName: string; lastName: string }>({
    firstName: '',
    lastName: ''
  })

  const onChangeFirstName = useCallback((value: string) => {
    setOnamae((prev) => ({ ...prev, firstName: value }))
  }, [])
  const onChangeLastName = useCallback((value: string) => {
    setOnamae((prev) => ({ ...prev, lastName: value }))
  }, [])

  const onamaeFormVuePropsRef = useRef({
    firstName: onamae.firstName,
    lastName: onamae.lastName,
    onChangeFirstName,
    onChangeLastName
  })

  useEffect(() => {
    let onamaeFormVue: App<Element> | null = null
    if (!onamaeFormVue) {
      onamaeFormVue = createApp({
        setup() {
          return () => {
            const _h = h(OnamaeForm)
            _h.props = {
              ...onamaeFormVuePropsRef.current
            }

            return _h
          }
        }
      })
      onamaeFormVue.mount('#onamae-form')
    }

    return () => {
      if (onamaeFormVue) {
        onamaeFormVue.unmount()
      }
    }
  }, [])

  return (
    <main className={`flex gap-y-6 flex-col items-center justify-between p-24 ${inter.className}`}>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />

      <div>
        <p>姓：{onamae.firstName}</p>
        <p>名：{onamae.lastName}</p>
      </div>

      <div id="onamae-form" />
    </main>
  )
}

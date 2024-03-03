'use client'

export default function RetValue({ values }: { values: any[][2] }) {
  return (
    <div>
      {
        values.map((val: any, id: number) => {
          return (
            <div key={id}>
              <span>{val[0].toString() + ": "}</span>
              <span>{val[1].toString()}</span>
            </div>
          )
        })
      }
    </div>
  )
}
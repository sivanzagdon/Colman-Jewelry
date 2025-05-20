export interface Item {
  _id: string
  __v: number
  image: string
  name: string
  price: number
  type: string
}

export async function getNecklaces(): Promise<Item[]> {
  try {
    const response = await fetch(
      'http://localhost:4000/api/items/getItemsByType?type=Necklace',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch necklaces')
    }

    const data = await response.json()
    return data.items || data
  } catch (error) {
    console.error('Error fetching necklaces:', error)
    return []
  }
}

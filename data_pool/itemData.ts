import { fakerZH_TW as faker } from '@faker-js/faker'
import dayjs from 'dayjs'
const { location, date } = faker

type Data = {
    id: string
    city: string
    address: string
    latitude: number
    longitude: number
    data: any
    latestUpdate: string
    status: string
    [key: string]: any
}

let isInitialized = false
const count = 50 as const // 資料總數
const dayCount = 30 as const // 資料天數
const CITY = ['台北', '高雄', '台南', '屏東', '彰化'] as const
const STATUS = ['online', 'disconnect', 'abnormal'] as const
const ITEMS = [
    { item: 'TMP', unit: '˚C', text: '溫度' },
    { item: 'HUM', unit: '%', text: '濕度' },
    { item: 'WS', unit: 'm/s', text: '風速' },
    { item: 'RAIN', unit: 'mm', text: '雨量' },
    { item: 'PM25', unit: 'μg/m³', text: 'PM2.5' },
    { item: 'PM10', unit: 'μg/m³', text: 'PM10' },
    { item: 'CO', unit: 'ppm', text: 'CO' },
    { item: 'CO2', unit: 'ppm', text: 'CO₂' },
    { item: 'O3', unit: 'ppb', text: 'O3' },
] as const

const generateMockData = () => {
    if (isInitialized) {
        console.log('已生成資料')
        return
    }
    // 生成函數
    const getRandomElement = <T>(array: readonly T[]): T => {
        return array[Math.floor(Math.random() * array.length)]
    }
    // 產生日期範圍
    const dateRange = Array.from({ length: dayCount }, (_, i) => dayjs().add(-i, 'day').format('YYYY-MM-DD'))
    // 產生測項資料
    const generateItemData = () => {
        return {
            date: dateRange,
            value: Array.from({ length: dayCount },
                () => faker.number.int({ min: 0, max: 100 })),
        }
    }

    // 單一設備資訊
    const singleDeviceData = Array.from({ length: count }, (): Data => {
        return {
            id: faker.string.uuid(),
            city: getRandomElement(CITY),
            address: location.streetAddress(),
            latitude: +faker.number.float({ min: 21.90, max: 25.30 }).toFixed(5),
            longitude: +faker.number.float({ min: 120.00, max: 122.00 }).toFixed(5),
            data: ITEMS.map(({ item, unit, text }) => ({
                item,
                unit,
                text,
                value: generateItemData()
            })),
            latestUpdate: dayjs(date.past()).format('YYYY-MM-DD HH:mm'),
            status: getRandomElement(STATUS)
        }
    })
    // 資料初始化
    isInitialized = true
    return {
        data: singleDeviceData,
        city: CITY,
    }
}
export default generateMockData()
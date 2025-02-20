import pusher from "."

// 事件通知或最新消息
export const triggerNotification = (type: 'news' | 'warning') => {
    try {
        const date = new Date()
        const eventContent = {
            type: 'info',
            title: '最新通知',
            message: '通知測試,每5秒送一次',
            time: date
        }
        if (type === 'warning') {
            eventContent.type = 'warning'
            eventContent.title = '警告'
            eventContent.message = "警告測試,每10秒送一次"
        }
        pusher.trigger('notification', 'update', eventContent)
    } catch (error) {
        console.error('pusher error ', error)
    }
}

// pusher 取得最新使用者資料
export const triggerUpdateUserList = async (func: () => Promise<any>) => {
    try {
        pusher.trigger('setting', 'update', await func())
    } catch (error) {
        console.error('pusher error ', error)
    }
}

// pusher 取得稼動率資料
export const triggerOperatingRate = () => {
    try {
        pusher.trigger('operating', 'update', 'H')
    } catch (error) {
        console.error('pusher error ', error)
    }
}
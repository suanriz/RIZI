import { message } from 'ant-design-vue'
import { SITE_NAME } from '@/utils/site'
import emailjs from '@emailjs/browser'

export const sendEmail = (templateKey: string, formData: any, callback?: () => void) => {
  const key = 'sendMailAlertKey'
  message.loading({ content: '正在發送郵件...', key })
  emailjs.send('service_roch32o', `template_${templateKey}`, formData, { publicKey: 'Qf5RSQrKi08v-w1HH' })
    .then(() => {
      if (callback) callback()
      message.success({ content: '郵件發送成功！', key })
    })
    .catch((error) => {
      message.error({ content: `發送失敗: ${error.text}`, key })
    })
}

export const renderTitle = (name: string) => `${name} | ${SITE_NAME}`

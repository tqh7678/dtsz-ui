import { ExtractPropTypes } from 'vue'

export const ButtonType = ['primary', 'success', 'info', 'warning', 'danger', 'text']

export const ButtonSize = ['large', 'middle', 'small', 'mini'];

/**
 * 接收传过来的值
 * @param type 定义按钮的类型 可选值为 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text'
 * @param size 定义按钮的大小 默认middle 可选值为 'large' | 'middle' | 'small' | 'mini'
*/
export const buttonProps = {
  type: {
    type: String,
    validator(value: string) {
      return ButtonType.includes(value)
    }
  },
  size: {
    type: String,
    validator(value: string) {
      return ButtonSize.includes(value)
    },
    default: 'middle'
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

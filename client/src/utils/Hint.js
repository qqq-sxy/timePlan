import { Toast } from 'antd-mobile';

//轻提示 成功
export function SuccessToast(text) {
    Toast.success(text,1)
}

//轻提示 失败
export function FailToast(text) {
    Toast.fail(text, 1);
}








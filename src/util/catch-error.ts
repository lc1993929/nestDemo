import { Code } from '/@/config/var';
import { Logger } from './logger';
export function CatchError(context: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function(...args) {
      try {
        const result = await original.call(this, ...args);
        return result;
      } catch (error) {
        Logger.error(error, context);
        return {code: Code.unkown, data: null, msg: 'unkown error!'} 
      }
    }  
  }
}
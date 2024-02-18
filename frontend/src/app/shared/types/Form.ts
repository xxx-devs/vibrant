import { FormProps } from 'antd/es/form';

export type FieldData<Values = any> = NonNullable<FormProps<Values>['fields']>[number];

import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    expertise:string,
    
}

export interface ServiceCardProps {
  id?: BaseKey | undefined,
  title: string,
  expertise: string,
  photo: string,
}

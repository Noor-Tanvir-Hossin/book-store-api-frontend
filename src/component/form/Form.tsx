import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ReactNode } from "react";

interface TFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface TBSForm extends TFormConfig {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}

const BSForm = ({ onSubmit, children, defaultValues, resolver }: TBSForm) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {children}
      </form>
    </FormProvider>
  );
};

export default BSForm;

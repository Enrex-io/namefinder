import { Form, Field } from "react-final-form";
import Button from "@/components/Button/Button";
import TextField from "@/components/TextField/TextField";
import SelectField from "@/components/SelectField/SelectField";
import { countries, COUNTRY_OPTIONS } from "@/consts/countries";
import { INDUSTRY_OPTIONS } from "@/consts/industries";
import { CompanySizes, COMPANY_SIZE_OPTIONS } from "@/consts/companySizes";
import { CompanyDetails, ParsedCompanyDetails } from "@/types";
import classes from "./SustainabilityCompanyDetails.module.scss";
import {
  validateCompanyName,
  validateCompanySize,
  validateCountry,
  validateSectorAndIndustry,
} from "@/utils/validators";
import Paper from "@/components/Paper/Paper";
import { MutableRefObject, useRef } from "react";
import { parseCompanyDetails } from "@/utils/helpers";

const HEADING_TEXT = "Fill company information";
const SUBMIT_BUTTON_TEXT = "Generate goals";

interface Props {
  onSubmitCompanyDetails: (
    companyDetails: ParsedCompanyDetails
  ) => Promise<void>;
  isHiddenButton?: boolean;
  valuesRef?: MutableRefObject<Record<string, any> | null>;
}

const SustainabilityCompanyDetails = ({
  onSubmitCompanyDetails,
  isHiddenButton = false,
  valuesRef
}: Props) => {
  const innerRef = useRef<Record<string, any> | null>(null);
  const ref = valuesRef || innerRef;
  // TODO: Remove any and add proper types from initialValues
  const handleSubmit = async (values: Record<string, any>) => {
    const result = parseCompanyDetails(values);
    await onSubmitCompanyDetails(result);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Form
        // TODO: Add initial values
        onSubmit={handleSubmit}
        render={({ handleSubmit, dirty, errors, submitting, values }) => {
          ref.current = parseCompanyDetails(values);
          return (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Paper className={classes.paper}>
                <div className={classes.fieldsContainer}>
                  <Field
                    name="companyName"
                    validate={validateCompanyName}
                    render={({ input, meta }) => (
                      <TextField
                        tabIndex={1}
                        label="Company Name"
                        hasAsterisk
                        placeholder="Company name"
                        isError={meta.touched && meta.error}
                        helperMessage={meta.touched && meta.error}
                        {...input} />
                    )} />
                  <Field
                    name="sectorAndIndustry"
                    validate={validateSectorAndIndustry}
                    render={({ input, meta }) => (
                      <SelectField
                        tabIndex={1}
                        label="Sector - Industry"
                        hasAsterisk
                        placeholder="Select"
                        options={INDUSTRY_OPTIONS}
                        isError={meta.touched && meta.error}
                        helperMessage={meta.touched && meta.error}
                        {...input} />
                    )} />
                  <Field
                    name="country"
                    validate={validateCountry}
                    render={({ input, meta }) => (
                      <SelectField
                        tabIndex={1}
                        hasAsterisk
                        label="Country"
                        placeholder="Select"
                        options={COUNTRY_OPTIONS}
                        isError={meta.touched && meta.error}
                        helperMessage={meta.touched && meta.error}
                        {...input} />
                    )} />
                  <Field
                    name="companySize"
                    validate={validateCompanySize}
                    render={({ input, meta }) => (
                      <SelectField
                        tabIndex={1}
                        label="Company Size"
                        hasAsterisk
                        placeholder="Select"
                        options={COMPANY_SIZE_OPTIONS}
                        isError={meta.touched && meta.error}
                        helperMessage={meta.touched && meta.error}
                        inputMode="none"
                        {...input} />
                    )} />
                </div>
              </Paper>
              {!isHiddenButton && (
                <Button
                  tabIndex={1}
                  type="submit"
                  className={classes.button}
                  isDisabled={!dirty || !!Object.keys(errors || {}).length}
                  isSubmitting={submitting}
                  funnyLoadingMessage
                >
                  {SUBMIT_BUTTON_TEXT}
                </Button>
              )}
            </form>
          );
        }}
      />
    </div>
  );
};

export default SustainabilityCompanyDetails;

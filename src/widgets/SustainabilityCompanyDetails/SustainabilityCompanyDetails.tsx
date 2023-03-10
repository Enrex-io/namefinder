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

const HEADING_TEXT = "Fill company information";
const SUBMIT_BUTTON_TEXT = "Generate goals";

interface Props {
  onSubmitCompanyDetails: (
    companyDetails: ParsedCompanyDetails
  ) => Promise<void>;
  isHiddenButton?: boolean;
}

const SustainabilityCompanyDetails = ({
  onSubmitCompanyDetails,
  isHiddenButton = false,
}: Props) => {
  // TODO: Remove any and add proper types from initialValues
  const handleSubmit = async (values: Record<string, any>) => {
    const result = {
      companyName: values.companyName,
      industry: values.sectorAndIndustry,
      country:
        countries.find((country) => country.code === values.country)?.label ||
        values.country,
      companySize:
        CompanySizes[values.companySize as keyof typeof CompanySizes] ||
        values.companySize,
    };
    await onSubmitCompanyDetails(result);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Form
        // TODO: Add initial values
        onSubmit={handleSubmit}
        render={({ handleSubmit, dirty, errors, submitting }) => (
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
                      {...input}
                    />
                  )}
                />
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
                      {...input}
                    />
                  )}
                />
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
                      {...input}
                    />
                  )}
                />
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
                      {...input}
                    />
                  )}
                />
              </div>
            </Paper>
            {!isHiddenButton && (
              <Button
                tabIndex={1}
                type="submit"
                className={classes.button}
                isDisabled={!dirty || !!Object.keys(errors || {}).length}
                isSubmitting={submitting}
              >
                {SUBMIT_BUTTON_TEXT}
              </Button>
            )}
          </form>
        )}
      />
    </div>
  );
};

export default SustainabilityCompanyDetails;

import { Form, Field } from "react-final-form";
import Button from "@/components/Button/Button";
import TextField from "@/components/TextField/TextField";
import SelectField from "@/components/SelectField/SelectField";
import { COUNTRY_OPTIONS } from "@/consts/countries";
import { INDUSTRY_OPTIONS } from "@/consts/industries";
import { COMPANY_SIZE_OPTIONS } from "@/consts/companySizes";
import { CompanyDetails } from "@/types";
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
  onSubmitCompanyDetails: (companyDetails: CompanyDetails) => void;
  isCompleted?: boolean;
}

const SustainabilityCompanyDetails = ({
  onSubmitCompanyDetails,
  isCompleted,
}: Props) => {
  // TODO: Remove any and add proper types from initialValues
  const handleSubmit = (values: Record<string, any>) => {
    const result: CompanyDetails = {
      companyName: values.companyName,
      industry: values.sectorAndIndustry,
      country: values.country,
      companySize: values.companySize,
    };
    onSubmitCompanyDetails(result);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>{HEADING_TEXT}</h2>
      <Form
        // TODO: Add initial values
        onSubmit={handleSubmit}
        render={({ handleSubmit, dirty, errors }) => (
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
                      placeholder="Enrex"
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
                      placeholder="Technology - Support"
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
                      placeholder="Angola"
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
                      placeholder="Medium 100 to 500 employees"
                      options={COMPANY_SIZE_OPTIONS}
                      isError={meta.touched && meta.error}
                      helperMessage={meta.touched && meta.error}
                      {...input}
                    />
                  )}
                />
              </div>
            </Paper>
            {!isCompleted && (
              <Button
                tabIndex={1}
                type="submit"
                className={classes.button}
                isDisabled={!dirty || !!Object.keys(errors || {}).length}
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

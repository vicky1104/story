import React from "react";
import { IconButton, Button, Container, TextField } from "@mui/material";
import { Field, Formik, Form, FieldArray } from "formik";
import axios from "axios";

export default function DemoForm() {
  return (
    <Container>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: [
            {
              address: "",
              street: "",
              city: "",
              state: "",
              country: "",
              pincode: "",
            },
          ],
          skills: [],
          hobbies: [],
          dob: null,
          education: [],
        }}
        onSubmit={(values) => {
          console.log(values);
          var url = "http://localhost:8080";
          axios
            .post(
              url,
              { ...values }
              // {
              //   headers: {
              //     "Content-Type": "application/json",
              //     "Access-Control-Allow-Origin": "*",
              //   },
              // }
            )
            .then((res) => {
              console.log(res.data);
            });
        }}
        render={({ values }) => (
          <Form>
            {/* ```````````````````` firstname ````````````   */}

            <Field
              type="text"
              name="firstName"
              render={(props) => {
                return (
                  <TextField
                    {...props.field}
                    label="firstName"
                    autoComplete="off"
                  />
                );
              }}
            />

            {/* ```````````````````` lastname ````````````   */}
            <Field
              type="text"
              name="lastName"
              render={(props) => {
                return (
                  <TextField
                    {...props.field}
                    label="lastName"
                    autoComplete="off"
                  />
                );
              }}
            />

            {/* ```````````````````` DOB ````````````   */}
            <Field
              name="dob"
              render={(props) => {
                return <TextField {...props.field} type="date" />;
              }}
            />
            {/* ````````````````````  skills Array ````````````   */}

            <FieldArray
              name="skills"
              render={(arrayHelpers) => (
                <div>
                  {values.skills && values.skills.length > 0 ? (
                    values.skills.map((friend, index) => (
                      <div key={index}>
                        <br />
                        <Field
                          name={`skills.${index}`}
                          render={(props) => {
                            return <TextField {...props.field} />;
                          }}
                        />
                        <IconButton
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </IconButton>
                        <IconButton
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </IconButton>
                      </div>
                    ))
                  ) : (
                    <>
                      <br />
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all skills from the list */}
                        Add a Skill
                      </Button>
                    </>
                  )}
                </div>
              )}
            />
            {/* ```````````````````` Hobby Array ````````````   */}

            <FieldArray
              name="hobbies"
              render={(arrayHelpers) => (
                <div>
                  {values.hobbies && values.hobbies.length > 0 ? (
                    values.hobbies.map((friend, index) => (
                      <div key={index}>
                        <br />
                        <Field
                          name={`hobbies.${index}`}
                          render={(props) => {
                            return (
                              <TextField {...props.field} label="Add a Hobby" />
                            );
                          }}
                        />
                        <IconButton
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </IconButton>
                        <IconButton
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </IconButton>
                      </div>
                    ))
                  ) : (
                    <>
                      <br />
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all skills from the list */}
                        Add a Hobby
                      </Button>
                    </>
                  )}
                </div>
              )}
            />
            {/* ```````````````````` Address Array ````````````   */}

            <FieldArray
              name="address"
              render={(arrayHelpers) => (
                <div>
                  {values.address && values.address.length > 0 ? (
                    values.address.map((address, index) => (
                      <div key={index}>
                        <br />
                        <Field
                          name={`address.${
                            index === 0 ? 0 : index - 1
                          }.address`}
                          render={(props) => {
                            // console.log(props, address);
                            return (
                              <TextField {...props.field} label="address" />
                            );
                          }}
                        />
                        <Field
                          name={`address.${index === 0 ? 0 : index - 1}.street`}
                          render={(props) => {
                            return (
                              <TextField {...props.field} label="Street" />
                            );
                          }}
                        />
                        <Field
                          name={`address.${index === 0 ? 0 : index - 1}.city`}
                          render={(props) => {
                            return <TextField {...props.field} label="City" />;
                          }}
                        />
                        <Field
                          name={`address.${index === 0 ? 0 : index - 1}.state`}
                          render={(props) => {
                            return <TextField {...props.field} label="State" />;
                          }}
                        />
                        <Field
                          name={`address.${
                            index === 0 ? 0 : index - 1
                          }.country`}
                          render={(props) => {
                            return (
                              <TextField {...props.field} label="Country" />
                            );
                          }}
                        />
                        <Field
                          name={`address.${
                            index === 0 ? 0 : index - 1
                          }.pincode`}
                          render={(props) => {
                            return (
                              <TextField
                                {...props.field}
                                label="Pincode"
                                type="number"
                              />
                            );
                          }}
                        />
                        <IconButton
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </IconButton>
                        <IconButton
                          type="button"
                          disabled={
                            values.address && values.address.length === 2
                          }
                          onClick={() => arrayHelpers.insert(index, {})} // insert an empty string at a position
                        >
                          +
                        </IconButton>
                      </div>
                    ))
                  ) : (
                    <>
                      <br />

                      <Button
                        disabled={values.address && values.address.length === 2}
                        onClick={() => arrayHelpers.push({})}
                      >
                        {/* show this when user has removed all skills from the list */}
                        Add a Address
                      </Button>
                    </>
                  )}
                </div>
              )}
            />
            {/* ```````````````````` Education Array ````````````   */}

            <FieldArray
              name="education"
              render={(arrayHelpers) => (
                <div>
                  {values.education && values.education.length > 0 ? (
                    values.education.map((friend, index) => (
                      <div key={index}>
                        <br />
                        <Field
                          name={`education.${
                            index === 0 ? 0 : index - 1
                          }.coures`}
                          render={(props) => {
                            return (
                              <TextField {...props.field} label="Cources" />
                            );
                          }}
                        />
                        <Field
                          name={`education.${index === 0 ? 0 : index - 1}.year`}
                          step="1"
                          render={(props) => {
                            return (
                              <TextField
                                {...props.field}
                                label="year"
                                type="number"
                                min="1900"
                                max="2099"
                              />
                            );
                          }}
                        />
                        <Field
                          name={`education.${
                            index === 0 ? 0 : index - 1
                          }.instution`}
                          render={(props) => {
                            return (
                              <TextField {...props.feild} label="Institution" />
                            );
                          }}
                        />
                        <Field
                          name={`education.${
                            index === 0 ? 0 : index - 1
                          }.grade`}
                          render={(props) => {
                            return <TextField {...props.field} label="Grade" />;
                          }}
                        />
                        <IconButton
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </IconButton>
                        <IconButton
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </IconButton>
                      </div>
                    ))
                  ) : (
                    <>
                      <br />
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all skills from the list */}
                        Add a education
                      </Button>
                    </>
                  )}
                </div>
              )}
            />
            <br />
            <Button type="submit">submit</Button>
          </Form>
        )}
      />
    </Container>
  );
}

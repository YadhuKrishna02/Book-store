import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const AddBook: React.FC = () => {
  const initialValues = {
    name: '',
    description: '',
    publishDate: '',
    price: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(1, 'Name must be at least 1 character')
      .max(255, 'Name must be at most 255 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(1, 'Description must be at least 1 character')
      .max(1000, 'Description must be at most 1000 characters'),
    publishDate: Yup.date().required('Publish Date is required'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be at least 0'),
  });

  const handleSubmit = (values: any) => {
    // Handle form submission (e.g., API call)
    console.log('Form submitted successfully:', values);
  };

  return (
    <div>
      <h2>Add Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label>Name</label>
              <Field type="text" name="name" />
              {errors.name && touched.name && <div>{errors.name}</div>}
            </div>
            <div>
              <label>Description</label>
              <Field as="textarea" name="description" />
              {errors.description && touched.description && (
                <div>{errors.description}</div>
              )}
            </div>
            <div>
              <label>Publish Date</label>
              <Field type="date" name="publishDate" />
              {errors.publishDate && touched.publishDate && (
                <div>{errors.publishDate}</div>
              )}
            </div>
            <div>
              <label>Price</label>
              <Field type="number" name="price" />
              {errors.price && touched.price && <div>{errors.price}</div>}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <div>
        <Link to="/">Back to Book List</Link>
      </div>
    </div>
  );
};

export default AddBook;

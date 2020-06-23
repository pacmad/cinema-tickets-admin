import React, { Dispatch } from "react";
import { Formik, FieldArray, Form, Field as FastField } from "formik";
import {
  IEditMovieFormProps,
  IEditMovieFormMappedDispatch,
  IEditMovieFormMappedState,
} from "./types";
import {
  Button,
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Snackbar,
  IconButton,
  Grid,
} from "@material-ui/core";
import { useRootStyles } from "App.styles";
import { MoviesActionTypes } from "redux/movies/types";
import { addMovieStartAction } from "redux/movies/movies.actions";
import { IMovie } from "api/types";
import { connect } from "react-redux";
import { selectMessage } from "redux/movies/movies.selectors";
import { IRootState } from "redux/types";
import Rating from "components/Rating";
import { Delete, Add } from "@material-ui/icons";

const EditMovieForm = ({
  movie,
  addMovie,
  message,
}: IEditMovieFormProps &
  IEditMovieFormMappedDispatch &
  IEditMovieFormMappedState) => {
  const rootClasses = useRootStyles();
  console.log("rerender of editmovie form");

  return (
    <>
      <Formik
        initialValues={{ ...movie }}
        onSubmit={(values) => {
          addMovie(values);
        }}
        validateOnChange={false}
      >
        {(props) => {
          console.log("Rerender of editmovie form");
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item container xs={4}>
                  <FastField
                    as={TextField}
                    label="Id"
                    fullWidth
                    name="id"
                    disabled
                  />
                  <FastField
                    as={TextField}
                    label="Title"
                    fullWidth
                    name="title"
                  />
                  <Rating rating={movie.rating} showTitle />
                  <FastField
                    as={TextField}
                    label="Director"
                    fullWidth
                    name="director"
                  />
                </Grid>
                <Grid item container xs={8}>
                  <FastField
                    as={TextField}
                    label="Description"
                    fullWidth
                    name="description"
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <FormGroup row>
                <FormControlLabel
                  label="New"
                  control={
                    <FastField
                      as={Checkbox}
                      name="isNew"
                      checked={props.values.isNew}
                      onChange={props.handleChange}
                    />
                  }
                />
                <FormControlLabel
                  label="Popular"
                  control={
                    <FastField
                      as={Checkbox}
                      name="isPopular"
                      checked={props.values.isPopular}
                      onChange={props.handleChange}
                    />
                  }
                />
                <FormControlLabel
                  label="Upcoming"
                  control={
                    <FastField
                      as={Checkbox}
                      name="isUpcoming"
                      checked={props.values.isUpcoming}
                      onChange={props.handleChange}
                    />
                  }
                />
              </FormGroup>
              <p>Genres</p>
              <FieldArray
                name="genres"
                render={({ push, remove }) => (
                  <Grid container>
                    {props.values.genres.map((genre, index) => (
                      <Grid item xs={3} key={`genre${index}`}>
                        <FastField as={TextField} name={`genres.${index}`} />
                        <IconButton onClick={() => remove(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    ))}
                    <IconButton onClick={() => push("")}>
                      <Add />
                    </IconButton>
                  </Grid>
                )}
              />
              <p>Stars</p>
              <FieldArray
                name="stars"
                render={({ push, remove }) => (
                  <Grid container>
                    {props.values.stars.map((star, index) => (
                      <Grid item xs={3} key={`star${index}`}>
                        <FastField as={TextField} name={`stars.${index}`} />
                        <IconButton onClick={() => remove(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    ))}
                    <IconButton onClick={() => push("")}>
                      <Add />
                    </IconButton>
                  </Grid>
                )}
              />
              <p>Photos Url</p>
              <FieldArray
                name="photosUrl"
                render={({ push, remove }) => (
                  <div>
                    {props.values.photosUrl.map((photoUrl, index) => (
                      <Grid container key={index}>
                        <Grid item xs={10}>
                          <FastField
                            as={TextField}
                            fullWidth
                            name={`photosUrl.${index}`}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={() => remove(index)}>
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                      onClick={() => push("")}
                    >
                      Add photo Url
                    </Button>
                  </div>
                )}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={rootClasses.crudButton}
              >
                Save
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Snackbar open={!!message} autoHideDuration={3000}>
        <p>{message}</p>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  message: selectMessage(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MoviesActionTypes>) => ({
  addMovie: (movie: IMovie) => dispatch(addMovieStartAction(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMovieForm);
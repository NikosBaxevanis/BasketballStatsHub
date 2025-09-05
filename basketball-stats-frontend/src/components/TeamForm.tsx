import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createTeam } from "../api/endpoints/teams";
import toast from "react-hot-toast";

//dummy commit

export const teamValidationSchema = Yup.object({
  name: Yup.string().required("Team name is required"),
  city: Yup.string().required("City is required"),
  founded: Yup.number().min(1900, "Must be a valid year"),
  championships: Yup.number().min(0),
  wins: Yup.number().min(0),
  defeats: Yup.number().min(0),
  homeWins: Yup.number().min(0),
  homeDefeats: Yup.number().min(0),
});

type TeamFormPropsType = {
  closeTeamForm: () => void;
};

const TeamForm = ({ closeTeamForm }: TeamFormPropsType) => {
  const { mutate: mutation, isPending } = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      toast.success("Team added successfully!");
      closeTeamForm();
    },
    onError: () => {
      toast.error("Failed to add team.");
    },
  });

  return (
    <div className="w-full max-w-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Add New Team</h2>

      <Formik
        initialValues={{
          name: "",
          city: "",
          founded: 0,
          championships: 0,
          wins: 0,
          defeats: 0,
          homeWins: 0,
          homeDefeats: 0,
        }}
        validationSchema={teamValidationSchema}
        onSubmit={(values) => {
          if (!isNaN(Number(values.founded))) {
            values.founded = Number(values.founded);
            mutation(values);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {[
              { name: "name", label: "Team Name" },
              { name: "city", label: "City" },
              { name: "founded", label: "Founded" },
              { name: "championships", label: "Championships" },
              { name: "wins", label: "Wins" },
              { name: "defeats", label: "Defeats" },
              { name: "homeWins", label: "Home Wins" },
              { name: "homeDefeats", label: "Home Defeats" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  {field.label}
                </label>
                <Field
                  type="text"
                  name={field.name}
                  className="w-full border rounded-lg p-2"
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            ))}

            <div className="flex gap-2">
              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={closeTeamForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                {isPending ? "Adding..." : "Add Team"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TeamForm;

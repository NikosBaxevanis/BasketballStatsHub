import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { createPlayer } from "../api/endpoints/players";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  team: Yup.string().required("Team name is required"),
  position: Yup.string().required("Position is required"),
  height: Yup.number().positive("Height must be positive").optional(),
  weight: Yup.number().positive("Weight must be positive").optional(),
  points: Yup.number().min(0),
  assists: Yup.number().min(0),
  rebounds: Yup.number().min(0),
  offensiveRebounds: Yup.number().min(0),
  defensiveRebounds: Yup.number().min(0),
  blocks: Yup.number().min(0),
  steals: Yup.number().min(0),
  fieldGoalsMade: Yup.number().min(0),
  fieldGoalsAttempted: Yup.number().min(0),
  threePointsMade: Yup.number().min(0),
  threePointsAttempted: Yup.number().min(0),
  freeThrowsMade: Yup.number().min(0),
  freeThrowsAttempted: Yup.number().min(0),
  turnovers: Yup.number().min(0),
  personalFouls: Yup.number().min(0),
  minutesPlayed: Yup.number().min(0),
});

const statFields = [
  { name: "points", label: "Points" },
  { name: "assists", label: "Assists" },
  { name: "rebounds", label: "Rebounds" },
  { name: "offensiveRebounds", label: "Offensive Rebounds" },
  { name: "defensiveRebounds", label: "Defensive Rebounds" },
  { name: "blocks", label: "Blocks" },
  { name: "steals", label: "Steals" },
  { name: "fieldGoalsMade", label: "Field Goals Made" },
  { name: "fieldGoalsAttempted", label: "Field Goals Attempted" },
  { name: "threePointsMade", label: "3-Point Made" },
  { name: "threePointsAttempted", label: "3-Point Attempted" },
  { name: "freeThrowsMade", label: "Free Throws Made" },
  { name: "freeThrowsAttempted", label: "Free Throws Attempted" },
  { name: "turnovers", label: "Turnovers" },
  { name: "personalFouls", label: "Personal Fouls" },
  { name: "minutesPlayed", label: "Minutes Played" },
];

type PlayerFormPropsType = {
  closePlayerForm: () => void;
};

const PlayerForm = ({ closePlayerForm }: PlayerFormPropsType) => {
  const { mutate: mutation, isPending } = useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      toast.success("Player created successfully!");
      closePlayerForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error creating player");
    },
  });

  return (
    <div className="w-full max-w-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Add New Player</h2>

      <Formik
        initialValues={{
          name: "",
          team: "",
          position: "",
          height: undefined,
          weight: undefined,
          points: 0,
          assists: 0,
          rebounds: 0,
          offensiveRebounds: 0,
          defensiveRebounds: 0,
          blocks: 0,
          steals: 0,
          fieldGoalsMade: 0,
          fieldGoalsAttempted: 0,
          threePointsMade: 0,
          threePointsAttempted: 0,
          freeThrowsMade: 0,
          freeThrowsAttempted: 0,
          turnovers: 0,
          personalFouls: 0,
          minutesPlayed: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          mutation(values);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full border rounded-lg p-2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Team
              </label>
              <Field
                type="text"
                name="team"
                className="w-full border rounded-lg p-2"
              />
              <ErrorMessage
                name="team"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Position
              </label>
              <Field
                type="text"
                name="position"
                className="w-full border rounded-lg p-2"
              />
              <ErrorMessage
                name="position"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Height (cm)
              </label>
              <Field
                type="text"
                name="height"
                className="w-full border rounded-lg p-2"
              />
              <ErrorMessage
                name="height"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Weight (kg)
              </label>
              <Field
                type="text"
                name="weight"
                className="w-full border rounded-lg p-2"
              />
              <ErrorMessage
                name="weight"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {statFields.map((field) => (
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
                onClick={closePlayerForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                {isPending ? "Adding..." : "Add Player"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PlayerForm;

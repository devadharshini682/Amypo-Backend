// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import deckService from "../../services/deckService";

// function EditDeck() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [language, setLanguage] = useState("");
//   const [description, setDescription] = useState("");
//   const [mentorName, setMentorName] = useState("");
//   const [capacity, setCapacity] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const loadDeck = async () => {
//       try {
//         const response =
//           await deckService.getDeckById(id);

//         const deck = response.data;

//         setTitle(deck.title || "");
//         setLanguage(deck.language || "");
//         setDescription(deck.description || "");
//         setMentorName(deck.mentorName || "");
//         setCapacity(deck.capacity || "");
//       } catch (err) {
//         setError("Failed to load deck");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDeck();
//   }, [id]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setSuccess("");

//     if (
//       !title.trim() ||
//       !language.trim() ||
//       !mentorName.trim() ||
//       !capacity
//     ) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     try {
//       await deckService.updateDeck(id, {
//         title: title,
//         language: language,
//         description: description,
//         mentorName: mentorName,
//         capacity: Number(capacity),
//       });

//       setSuccess("Deck updated successfully.");

//       setTimeout(() => {
//         navigate(`/decks/${id}`);
//       }, 500);
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           "Failed to update deck"
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="page-container">
//         Loading deck...
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">

//       <div className="form-container">

//         <h1>Edit Deck</h1>

//         {error && (
//           <p className="error-message">
//             {error}
//           </p>
//         )}

//         {success && (
//           <p className="success-message">
//             {success}
//           </p>
//         )}

//         <form onSubmit={handleSubmit}>

//           <label htmlFor="title">
//             Deck Title
//           </label>

//           <input
//             id="title"
//             name="title"
//             type="text"
//             value={title}
//             onChange={(event) =>
//               setTitle(event.target.value)
//             }
//             required
//           />

//           <label htmlFor="language">
//             Language
//           </label>

//           <input
//             id="language"
//             name="language"
//             type="text"
//             value={language}
//             onChange={(event) =>
//               setLanguage(event.target.value)
//             }
//             required
//           />

//           <label htmlFor="description">
//             Description
//           </label>

//           <textarea
//             id="description"
//             name="description"
//             value={description}
//             onChange={(event) =>
//               setDescription(event.target.value)
//             }
//           />

//           <label htmlFor="mentorName">
//             Mentor Name
//           </label>

//           <input
//             id="mentorName"
//             name="mentorName"
//             type="text"
//             value={mentorName}
//             onChange={(event) =>
//               setMentorName(event.target.value)
//             }
//             required
//           />

//           <label htmlFor="capacity">
//             Capacity
//           </label>

//           <input
//             id="capacity"
//             name="capacity"
//             type="number"
//             min="1"
//             value={capacity}
//             onChange={(event) =>
//               setCapacity(event.target.value)
//             }
//             required
//           />

//           <button
//             type="submit"
//             className="primary-button"
//           >
//             Update Deck
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               navigate(`/decks/${id}`)
//             }
//           >
//             Cancel
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default EditDeck;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import deckService from "../../services/deckService";

function EditDeck() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [capacity, setCapacity] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const response =
          await deckService.getDeckById(id);

        const deck = response.data;

        // Pre-fill all form fields
        setTitle(deck.title || "");

        setLanguage(
          deck.language ||
          deck.languageName ||
          ""
        );

        setDescription(
          deck.description || ""
        );

        setMentorName(
          deck.mentorName || ""
        );

        setCapacity(
          deck.capacity ?? ""
        );

      } catch (err) {
        console.error(
          "Failed to load deck:",
          err
        );

        setError(
          "Failed to load deck"
        );

      } finally {
        setLoading(false);
      }
    };

    loadDeck();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !title.trim() ||
      !language.trim() ||
      !mentorName.trim() ||
      !capacity
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    try {
      await deckService.updateDeck(id, {
        title: title,
        language: language,
        description: description,
        mentorName: mentorName,
        capacity: Number(capacity),
      });

      setSuccess(
        "Deck updated successfully."
      );

      setTimeout(() => {
        navigate(`/decks/${id}`);
      }, 500);

    } catch (err) {
      console.error(
        "Failed to update deck:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to update deck"
      );
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        Loading deck...
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="form-container">

        <h1>
          Edit Deck
        </h1>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {success && (
          <p className="success-message">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <label htmlFor="title">
            Deck Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />

          <label htmlFor="language">
            Language
          </label>

          <input
            id="language"
            name="language"
            type="text"
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value)
            }
            required
          />

          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

          <label htmlFor="mentorName">
            Mentor Name
          </label>

          <input
            id="mentorName"
            name="mentorName"
            type="text"
            value={mentorName}
            onChange={(event) =>
              setMentorName(event.target.value)
            }
            required
          />

          <label htmlFor="capacity">
            Capacity
          </label>

          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={capacity}
            onChange={(event) =>
              setCapacity(event.target.value)
            }
            required
          />

          <button
            type="submit"
            className="primary-button"
          >
            Update Deck
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`/decks/${id}`)
            }
          >
            Cancel
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditDeck;
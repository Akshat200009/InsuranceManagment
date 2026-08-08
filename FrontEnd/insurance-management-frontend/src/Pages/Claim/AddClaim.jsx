import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import policyService from "../../Services/policyService";
import claimService from "../../Services/claimService";
import ClaimForm from "../../Components/claim/ClaimForm";

function AddClaim() {

    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);

    useEffect(() => {

        loadPolicies();

    }, []);

    const loadPolicies = async () => {

        try {

            const response =
                await policyService.getActivePolicies();

            setPolicies(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSubmit = async (claimData) => {

        try {

            await claimService.submitClaim(claimData);

            await Swal.fire({

                icon: "success",

                title: "Success",

                text: "Claim Submitted Successfully",

                timer: 1500,

                showConfirmButton: false

            });

            navigate("/claims");

        }

      catch (error) {

    if (error.response?.status === 400) {

        const validationErrors = {};

        error.response.data.forEach((err) => {

            validationErrors[err.field] = err.defaultMessage;

        });

        return validationErrors;

    }

    Swal.fire({

        icon: "error",

        title: "Failed",

        text:
            error.response?.data?.message ||
            "Unable to submit claim"

    });

}

    };

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                Submit Insurance Claim

            </h1>

            <ClaimForm

                policies={policies}

                onSubmit={handleSubmit}

                onCancel={() => navigate("/claims")}

            />

        </div>

    );

}

export default AddClaim;
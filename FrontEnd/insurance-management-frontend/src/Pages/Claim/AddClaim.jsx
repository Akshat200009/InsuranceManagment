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

            // Get only logged-in customer's policies
            const response =
                await policyService.getMyPolicies();

            console.log("MY POLICIES:", response);

            // Only ACTIVE policies can be used for claim
            const activePolicies = response.filter(
                (policy) => policy.status === "ACTIVE"
            );

            setPolicies(activePolicies);

        }
        catch (error) {

            console.error("POLICY ERROR:", error);
            console.error("STATUS:", error.response?.status);
            console.error("DATA:", error.response?.data);

            Swal.fire({
                icon: "error",
                title: "Unable to Load Policies",
                text:
                    error.response?.data?.message ||
                    "Unable to load your active policies"
            });

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

            console.error("CLAIM ERROR:", error);

            if (error.response?.status === 400) {

                const validationErrors = {};

                if (Array.isArray(error.response.data)) {

                    error.response.data.forEach((err) => {

                        validationErrors[err.field] =
                            err.defaultMessage;

                    });

                    return validationErrors;
                }

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
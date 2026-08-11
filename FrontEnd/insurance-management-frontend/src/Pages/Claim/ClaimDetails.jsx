import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../Layouts/DashboardLayout";
import claimService from "../../Services/claimService";
import claimDocumentService from "../../Services/claimDocumentService";
import ClaimDocumentTable from "../../Components/claim/ClaimDocumentTable";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

function ClaimDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [claim, setClaim] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const role = localStorage.getItem("role");

  const isCustomer = role === "CUSTOMER";
  const isAdminOrAgent = role === "ADMIN" || role === "AGENT";
  

 useEffect(() => {
  loadClaim();
  loadDocuments();
}, [id]);

  // ===============================
  // LOAD CLAIM
  // ===============================

  const loadClaim = async () => {
    try {
      let response;

      if (isCustomer) {
        response = await claimService.getMyClaimById(id);
      } else {
        response = await claimService.getClaimById(id);
      }

      setClaim(response);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load claim");
    }
  };

  // ===============================
  // LOAD DOCUMENTS
  // ===============================

const loadDocuments = async () => {
    try {

        console.log("CLAIM ID FOR DOCUMENTS:", id);

        const response =
            await claimDocumentService.getClaimDocuments(id);

        console.log("DOCUMENTS RESPONSE:", response);

        setDocuments(response);

    } catch (error) {

        console.error("DOCUMENTS ERROR:", error);
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);

    }
};

  // ===============================
  // UPLOAD DOCUMENT
  // ===============================

  const uploadDocument = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "Select File",
        text: "Please select a document.",
      });

      return;
    }

    try {
      const message = await claimDocumentService.uploadDocument(
        claim.id,
        selectedFile,
      );

      Swal.fire({
        icon: "success",
        title: "Uploaded",
        text: message,
        timer: 1500,
        showConfirmButton: false,
      });

      setSelectedFile(null);

      await loadDocuments();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.response?.data?.message || "Unable to upload document",
      });
    }
  };

  // ===============================
  // APPROVE CLAIM
  // ===============================

  const approve = async () => {
    try {
      const updated = await claimService.approveClaim(id);

      setClaim(updated);

      Swal.fire({
        icon: "success",
        title: "Approved",
        text: "Claim approved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to approve claim");
    }
  };

  // ===============================
  // REJECT CLAIM
  // ===============================

  const reject = async () => {
    try {
      const updated = await claimService.rejectClaim(id);

      setClaim(updated);

      Swal.fire({
        icon: "success",
        title: "Rejected",
        text: "Claim rejected successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to reject claim");
    }
  };

  if (!claim) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-gray-500">Loading Claim...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Claim Details</h1>

            <p className="text-gray-500 mt-1">Policy: {claim.policyNumber}</p>
          </div>
        </div>

        {/* Claim Details */}

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8">Claim Information</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500">Policy Number</p>

              <p className="font-semibold text-lg">{claim.policyNumber}</p>
            </div>

            <div>
              <p className="text-gray-500">Claim Amount</p>

              <p className="font-semibold text-lg">
                ₹{claim.claimAmount.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Reason</p>

              <p className="font-semibold text-lg">{claim.reason}</p>
            </div>

            <div>
              <p className="text-gray-500">Submission Date</p>

              <p className="font-semibold text-lg">{claim.submissionDate}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>

              <span
                className={`inline-block px-4 py-1 rounded-full font-semibold ${
                  claim.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : claim.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {claim.status}
              </span>
            </div>
          </div>
        </div>

        {/* Supporting Documents */}

        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Supporting Documents</h2>

          {/* Customer can upload */}

          {isCustomer && (
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="border rounded-lg p-2"
                />

                <button
                  onClick={uploadDocument}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
                >
                  Upload Document
                </button>
              </div>

              {selectedFile && (
                <p className="text-gray-600 mt-3">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          )}

          {/* Documents Table */}

          {documents.length === 0 ? (
            <p className="text-gray-500">No Supporting Documents Found</p>
          ) : (
            <ClaimDocumentTable documents={documents} />
          )}
        </div>

        {/* Admin / Agent Actions */}

        {isAdminOrAgent && claim.status === "PENDING" && (
          <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Claim Verification</h2>

            <div className="flex gap-4">
              <button
                onClick={approve}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Approve Claim
              </button>

              <button
                onClick={reject}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
              >
                Reject Claim
              </button>
            </div>
          </div>
        )}

        {/* Back */}

        <div className="mt-8">
          <button
            onClick={() => navigate("/claims")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
          >
            Back to Claims
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ClaimDetails;

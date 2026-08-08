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

  useEffect(() => {
    loadClaim();
    loadDocuments();
  }, []);

  const loadClaim = async () => {
    try {
      const response = await claimService.getClaimById(id);

      setClaim(response);
    } catch (error) {
      toast.error("Unable to load claim");
    }
  };
  const loadDocuments = async () => {
    try {
      const response = await claimDocumentService.getClaimDocuments(id);

      setDocuments(response);
    } catch (error) {
      console.log(error);
    }
  };

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

  const approve = async () => {
    try {
      const updated = await claimService.approveClaim(id);

      setClaim(updated);

      Swal.fire({
        icon: "success",

        title: "Approved",

        timer: 1500,

        showConfirmButton: false,
      });
    } catch {
      toast.error("Unable to approve");
    }
  };

  const reject = async () => {
    try {
      const updated = await claimService.rejectClaim(id);

      setClaim(updated);

      Swal.fire({
        icon: "success",

        title: "Rejected",

        timer: 1500,

        showConfirmButton: false,
      });
    } catch {
      toast.error("Unable to reject");
    }
  };

  if (!claim) {
    return (
      <DashboardLayout>
        <div className="text-center mt-20">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">Claim Verification</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">Policy Number</label>

            <p>{claim.policyNumber}</p>
          </div>

          <div>
            <label className="font-semibold">Claim Amount</label>

            <p>₹{claim.claimAmount.toLocaleString()}</p>
          </div>

          <div>
            <label className="font-semibold">Reason</label>

            <p>{claim.reason}</p>
          </div>

          <div>
            <label className="font-semibold">Submission Date</label>

            <p>{claim.submissionDate}</p>
          </div>

          <div>
            <label className="font-semibold">Status</label>

            <p>{claim.status}</p>
          </div>
          <div className="mt-10 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Supporting Documents</h2>

            <div className="flex items-center gap-4">
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
                Upload
              </button>
            </div>

            {selectedFile && (
              <p className="text-gray-600 mt-3">
                Selected :{selectedFile.name}
              </p>
            )}
          </div>
          <div className="mt-8">
            <ClaimDocumentTable documents={documents} />
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/claims")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
          >
            Back
          </button>

          {claim.status === "PENDING" && (
            <div className="flex gap-4">
              <button
                onClick={approve}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Approve
              </button>

              <button
                onClick={reject}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ClaimDetails;

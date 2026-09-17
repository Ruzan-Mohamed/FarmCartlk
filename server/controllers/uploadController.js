const supabase = require("../config/supabase");

const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const file = req.file;

    const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `products/${fileName}`;

    const { data, error } = await supabase.storage
      .from("farmcart-media")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: error.message,
      });
    }

    const { data: urlData } = supabase.storage
      .from("farmcart-media")
      .getPublicUrl(data.path);

    return res.status(201).json({
      success: true,
      message: "Product image uploaded successfully to Supabase Storage",
      path: data.path,
      publicUrl: urlData ? urlData.publicUrl : ""
    });
  } catch (error) {
    console.error("Upload controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  uploadProductImage,
};
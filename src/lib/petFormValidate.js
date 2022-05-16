function petFormValidate(values) {
    let errors = {};
    if (!values.type) {
        errors.type = "Type is required!"
    }
    if (!values.name) {
        errors.name = "Name is required!"
    }
     if (!values.adoptionStatus) {
        errors.adoptionStatus = "Adoption status is required!"
    }
    if (!values.picture) {
        errors.picture = "Picture is required!"
    }
    if (!values.breed) {
        errors.breed = "Breed is required!"
    }
    if (!values.height) {
        errors.height = "Height is required!"
    } else if (values.height<=0) {
      errors.height="Height can not be less than 0!"
    }
    if (!values.weight) {
      errors.weight = "Weight is required!";
    } else if (values.weight <= 0) {
      errors.weight = "Weight can not be less than 0!";
    }
    if (!values.color) {
        errors.color = "Color is required!"
    }
    if (!values.hypoallergenic) {
        errors.hypoallergenic = "Hypoallergenic is required!"
    }
    if (!values.dietary) {
        errors.dietary = "Dietary is required!"
    }

    return errors;
    
      
    //   picture: fileImgRef.current.files[0],
 
    //   height: parseFloat(height),
    //   weight: parseFloat(weight),
    
    //   hypoallergenic:hypoallergenicValue,
      
}


export default petFormValidate;
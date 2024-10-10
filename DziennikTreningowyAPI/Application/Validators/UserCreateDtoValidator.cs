using DziennikTreningowyAPI.Application.DTOs.User;
using FluentValidation;

namespace DziennikTreningowyAPI.Application.Validators;

public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
{
    public UserCreateDtoValidator()
    {
        RuleFor(userCreateDto => userCreateDto.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format")
            .MaximumLength(254).WithMessage("Email cannot be longer than 254 characters");

        RuleFor(user => user.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long")
            .MaximumLength(128).WithMessage("Password cannot exceed 128 characters");

        RuleFor(user => user.DateOfBirth)
            .NotEmpty().WithMessage("Date of birth is required");

        RuleFor(user => user.FirstName)
            .MaximumLength(50).WithMessage("First Name cannot be longer than 50 characters");

        RuleFor(user => user.LastName)
            .MaximumLength(50).WithMessage("Last Name cannot be longer than 50 characters");

        RuleFor(user => user.Weight)
            .InclusiveBetween(30, 300).WithMessage("Weight must be between 30 an 300kg")
            .When(user => user.Weight.HasValue);

        RuleFor(user => user.Height)
            .InclusiveBetween(50, 250).WithMessage("Height must be between 50 and 250cm")
            .When(user => user.Height.HasValue);

        RuleFor(user => user.Gender)
            .Must(BeValidGender!).WithMessage("Gender must be either 'Male', 'Female'")
            .When(user => !string.IsNullOrEmpty(user.Gender));
    }
    
    private bool BeValidGender(string gender)
    {
        var validGenders = new[] { "Male", "Female", "Other" };
        return validGenders.Contains(gender, StringComparer.OrdinalIgnoreCase);
    }
}
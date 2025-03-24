using FluentValidation;

namespace DziennikTreningowyAPI.Application.Extensions;

public static class CustomValidationExtensions
{
    public static IRuleBuilderOptions<T, string> CustomEmailValidation<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
            .NotEmpty().WithMessage("Email address is required")
            .EmailAddress().WithMessage("Email address is invalid")
            .MaximumLength(254).WithMessage("Maximum length of email address is 254 characters");
    }
    
    public static IRuleBuilderOptions<T, string> CustomPasswordValidation<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long")
            .MaximumLength(128).WithMessage("Password cannot exceed 128 characters");
    }
}
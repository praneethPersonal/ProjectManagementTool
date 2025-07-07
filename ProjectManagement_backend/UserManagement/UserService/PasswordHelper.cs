using System.Security.Cryptography;

public static class PasswordHelper
{
    public static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256).GetBytes(32);
        return Convert.ToBase64String(salt.Concat(hash).ToArray());
    }

    public static bool VerifyPassword(string password, string storedHash)
    {
        var fullBytes = Convert.FromBase64String(storedHash);
        var salt = fullBytes[..16];
        var hash = fullBytes[16..];

        var newHash = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256).GetBytes(32);
        return hash.SequenceEqual(newHash);
    }
}
using System.Text.RegularExpressions;
using Roll10.Domain.Services;

namespace Roll10.Domain.Tests;

public class HelperTests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void CanCreateId()
    {
        for (var x = 0; x < 100; x++)
        {
            var id = Helpers.GenerateId();
            Assert.That(new Regex("[a-z0-9]{15}").IsMatch(id), id);
        }
    }
}